package com.leadengine.service;

import com.leadengine.domain.Lead;
import com.leadengine.domain.LeadStatus;
import com.leadengine.dto.LeadDetailResponseDTO;
import com.leadengine.dto.LeadQualificationCallbackDTO;
import com.leadengine.dto.LeadResponseDTO;
import com.leadengine.dto.LeadSubmissionDTO;
import com.leadengine.exception.LeadProcessingException;
import com.leadengine.exception.ResourceNotFoundException;
import com.leadengine.repository.LeadRepository;
import java.util.EnumSet;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Slf4j
@Service
@RequiredArgsConstructor
public class LeadService {

    private static final Set<LeadStatus> TERMINAL_CALLBACK_STATUSES =
            EnumSet.of(LeadStatus.QUALIFIED, LeadStatus.DISQUALIFIED, LeadStatus.FAILED);

    private final LeadRepository leadRepository;
    private final LeadDispatchService leadDispatchService;

    /**
     * Persists the lead in QUEUED state and schedules n8n dispatch after the DB commit so the
     * async worker can read the row, then returns 202 Accepted quickly.
     */
    @Transactional
    public LeadResponseDTO submitLead(LeadSubmissionDTO submission) {
        Lead lead = Lead.builder()
                .fullName(submission.getFullName().trim())
                .email(submission.getEmail().trim().toLowerCase())
                .companyName(submission.getCompanyName().trim())
                .budgetUsd(submission.getBudgetUsd())
                .projectScope(submission.getProjectScope().trim())
                .leadStatus(LeadStatus.QUEUED)
                .build();

        Lead saved = leadRepository.save(lead);
        log.info("Lead {} persisted with status QUEUED", saved.getId());

        UUID leadId = saved.getId();
        if (TransactionSynchronizationManager.isSynchronizationActive()) {
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCommit() {
                    leadDispatchService.dispatch(leadId);
                }
            });
        } else {
            leadDispatchService.dispatch(leadId);
        }

        return LeadResponseDTO.builder()
                .leadId(saved.getId())
                .status(saved.getLeadStatus())
                .timestamp(saved.getCreatedAt())
                .build();
    }

    @Transactional(readOnly = true)
    public LeadDetailResponseDTO getLead(UUID id) {
        Lead lead = leadRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead", id));
        return toDetail(lead);
    }

    /**
     * n8n qualification callback — writes score and terminal status after LLM evaluation.
     */
    @Transactional
    public LeadDetailResponseDTO applyQualification(UUID id, LeadQualificationCallbackDTO callback) {
        if (!TERMINAL_CALLBACK_STATUSES.contains(callback.getStatus())) {
            throw new LeadProcessingException(
                    "Callback status must be QUALIFIED, DISQUALIFIED, or FAILED. Received: "
                            + callback.getStatus());
        }

        Lead lead = leadRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead", id));

        if (lead.getLeadStatus() == LeadStatus.QUALIFIED
                || lead.getLeadStatus() == LeadStatus.DISQUALIFIED) {
            log.warn(
                    "Ignoring duplicate qualification callback for lead {} (already {})",
                    id,
                    lead.getLeadStatus());
            return toDetail(lead);
        }

        lead.setLeadStatus(callback.getStatus());
        lead.setQualificationScore(callback.getQualificationScore());
        Lead updated = leadRepository.save(lead);

        log.info(
                "Lead {} qualification applied: status={}, score={}",
                id,
                updated.getLeadStatus(),
                updated.getQualificationScore());

        return toDetail(updated);
    }

    private LeadDetailResponseDTO toDetail(Lead lead) {
        return LeadDetailResponseDTO.builder()
                .leadId(lead.getId())
                .fullName(lead.getFullName())
                .email(lead.getEmail())
                .companyName(lead.getCompanyName())
                .budgetUsd(lead.getBudgetUsd())
                .projectScope(lead.getProjectScope())
                .qualificationScore(lead.getQualificationScore())
                .status(lead.getLeadStatus())
                .createdAt(lead.getCreatedAt())
                .updatedAt(lead.getUpdatedAt())
                .build();
    }
}
