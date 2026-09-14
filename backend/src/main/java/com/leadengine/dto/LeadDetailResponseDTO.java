package com.leadengine.dto;

import com.leadengine.domain.LeadStatus;
import java.time.Instant;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Full lead projection returned by status-polling endpoints.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeadDetailResponseDTO {

    private UUID leadId;
    private String fullName;
    private String email;
    private String companyName;
    private Integer budgetUsd;
    private String projectScope;
    private Integer qualificationScore;
    private LeadStatus status;
    private Instant createdAt;
    private Instant updatedAt;
}
