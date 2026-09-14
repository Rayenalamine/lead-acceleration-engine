package com.leadengine.dto;

import com.leadengine.domain.LeadStatus;
import java.time.Instant;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeadResponseDTO {

    private UUID leadId;
    private LeadStatus status;
    private Instant timestamp;
}
