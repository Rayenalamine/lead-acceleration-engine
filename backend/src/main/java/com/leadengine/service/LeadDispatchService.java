package com.leadengine.service;

import com.leadengine.client.N8nWebhookClient;
import com.leadengine.config.DemoQualificationSimulator;
import com.leadengine.config.LeadEngineProperties;
import com.leadengine.domain.Lead;
import com.leadengine.domain.LeadStatus;
import com.leadengine.exception.ResourceNotFoundException;
import com.leadengine.repository.LeadRepository;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;

/**
 * Isolated async dispatcher so {@code @Async} proxying is not defeated by self-invocation.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class LeadDispatchService {

    private final LeadRepository leadRepository;
    private final N8nWebhookClient n8nWebhookClient;
    private final TransactionTemplate transactionTemplate;
    private final LeadEngineProperties properties;
    private final ObjectProvider<DemoQualificationSimulator> demoSimulator;

    @Async("leadDispatchExecutor")
    public void dispatch(UUID leadId) {
        try {
            Lead lead = markProcessing(leadId);

            if (properties.getDemo().isEnabled()) {
                Optional.ofNullable(demoSimulator.getIfAvailable())
                        .ifPresent(sim -> sim.schedule(leadId, lead.getBudgetUsd()));
                log.info("Demo mode enabled — skipping live n8n dispatch for lead {}", leadId);
                return;
            }

            n8nWebhookClient
                    .dispatchLead(lead)
                    .doOnError(error -> markFailed(leadId, error.getMessage()))
                    .onErrorResume(error -> reactor.core.publisher.Mono.empty())
                    .block();
        } catch (Exception ex) {
            log.error("Unexpected error during async dispatch for lead {}: {}", leadId, ex.getMessage(), ex);
            markFailed(leadId, ex.getMessage());
        }
    }

    private Lead markProcessing(UUID leadId) {
        return transactionTemplate.execute(status -> {
            Lead lead = leadRepository
                    .findById(leadId)
                    .orElseThrow(() -> new ResourceNotFoundException("Lead", leadId));
            lead.setLeadStatus(LeadStatus.PROCESSING);
            Lead saved = leadRepository.save(lead);
            log.info("Lead {} marked PROCESSING prior to n8n dispatch", leadId);
            return saved;
        });
    }

    private void markFailed(UUID leadId, String reason) {
        transactionTemplate.executeWithoutResult(status -> leadRepository.findById(leadId).ifPresent(lead -> {
            if (lead.getLeadStatus() == LeadStatus.PROCESSING || lead.getLeadStatus() == LeadStatus.QUEUED) {
                lead.setLeadStatus(LeadStatus.FAILED);
                leadRepository.save(lead);
                log.error("Lead {} marked FAILED due to: {}", leadId, reason);
            }
        }));
    }
}
