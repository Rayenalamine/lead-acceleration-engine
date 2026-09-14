package com.leadengine.dto;

import com.leadengine.domain.LeadStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Callback payload used by n8n (Phase 3) to write qualification results back into the engine.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeadQualificationCallbackDTO {

    @NotNull(message = "Lead status is required")
    private LeadStatus status;

    @Min(value = 0, message = "Qualification score must be at least 0")
    @Max(value = 100, message = "Qualification score must be at most 100")
    private Integer qualificationScore;
}
