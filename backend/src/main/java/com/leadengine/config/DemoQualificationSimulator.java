package com.leadengine.config;

import com.leadengine.domain.LeadStatus;
import com.leadengine.repository.LeadRepository;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionTemplate;

/**
 * Local Phase 1–2 simulator that applies a qualification result when n8n is not yet wired.
 * Enable with {@code lead-engine.demo.enabled=true}.
 */
@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(prefix = "lead-engine.demo", name = "enabled", havingValue = "true")
public class DemoQualificationSimulator {

    private final LeadRepository leadRepository;
    private final TransactionTemplate transactionTemplate;
    private final LeadEngineProperties properties;
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor(r -> {
        Thread t = new Thread(r, "demo-qualify");
        t.setDaemon(true);
        return t;
    });

    public void schedule(UUID leadId, int budgetUsd) {
        long delayMs = properties.getDemo().getDelayMs();
        scheduler.schedule(() -> applyDemoResult(leadId, budgetUsd), delayMs, TimeUnit.MILLISECONDS);
    }

    private void applyDemoResult(UUID leadId, int budgetUsd) {
        try {
            boolean qualified = budgetUsd >= 5000;
            LeadStatus status = qualified ? LeadStatus.QUALIFIED : LeadStatus.DISQUALIFIED;
            int score = qualified ? Math.min(95, 55 + budgetUsd / 1000) : 28;

            transactionTemplate.executeWithoutResult(tx -> leadRepository.findById(leadId).ifPresent(lead -> {
                if (lead.getLeadStatus() == LeadStatus.QUALIFIED || lead.getLeadStatus() == LeadStatus.DISQUALIFIED) {
                    return;
                }
                lead.setLeadStatus(status);
                lead.setQualificationScore(score);
                leadRepository.save(lead);
                log.info("Demo simulator applied {} (score={}) for lead {}", status, score, leadId);
            }));
        } catch (Exception ex) {
            log.warn("Demo simulator could not qualify lead {}: {}", leadId, ex.getMessage());
        }
    }
}
