package com.leadengine.client;

import com.leadengine.config.LeadEngineProperties;
import com.leadengine.domain.Lead;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

/**
 * Fire-and-forget WebClient dispatcher that posts lead payloads to the n8n qualification webhook.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class N8nWebhookClient {

    private final WebClient n8nWebClient;
    private final LeadEngineProperties properties;

    /**
     * Dispatches asynchronously. Errors are logged and surfaced via the returned Mono so the
     * caller can mark the lead as FAILED without blocking the HTTP request thread.
     */
    public Mono<Void> dispatchLead(Lead lead) {
        String url = properties.getN8n().getWebhookUrl();
        Map<String, Object> payload = buildPayload(lead);

        log.info("Dispatching lead {} to n8n webhook {}", lead.getId(), url);

        return n8nWebClient
                .post()
                .uri(url)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(payload)
                .retrieve()
                .toBodilessEntity()
                .doOnSuccess(response ->
                        log.info(
                                "n8n accepted lead {} with HTTP {}",
                                lead.getId(),
                                response.getStatusCode().value()))
                .doOnError(error ->
                        log.error(
                                "n8n webhook dispatch failed for lead {}: {}",
                                lead.getId(),
                                error.getMessage()))
                .then();
    }

    private Map<String, Object> buildPayload(Lead lead) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("leadId", lead.getId().toString());
        payload.put("fullName", lead.getFullName());
        payload.put("email", lead.getEmail());
        payload.put("companyName", lead.getCompanyName());
        payload.put("budgetUsd", lead.getBudgetUsd());
        payload.put("projectScope", lead.getProjectScope());
        payload.put("callbackUrl", buildCallbackUrl(lead.getId()));
        return payload;
    }

    private String buildCallbackUrl(UUID leadId) {
        String base = properties.getCallbackBaseUrl();
        if (base.endsWith("/")) {
            base = base.substring(0, base.length() - 1);
        }
        return base + "/api/v1/leads/" + leadId + "/qualification";
    }
}
