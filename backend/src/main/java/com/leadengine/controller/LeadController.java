package com.leadengine.controller;

import com.leadengine.dto.LeadDetailResponseDTO;
import com.leadengine.dto.LeadQualificationCallbackDTO;
import com.leadengine.dto.LeadResponseDTO;
import com.leadengine.dto.LeadSubmissionDTO;
import com.leadengine.service.LeadService;
import jakarta.validation.Valid;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/leads")
@RequiredArgsConstructor
public class LeadController {

    private final LeadService leadService;

    /**
     * Ingests a lead and returns 202 Accepted immediately while n8n dispatch runs asynchronously.
     */
    @PostMapping
    public ResponseEntity<LeadResponseDTO> submitLead(@Valid @RequestBody LeadSubmissionDTO submission) {
        LeadResponseDTO response = leadService.submitLead(submission);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    /**
     * Real-time status polling endpoint used by the intake portal.
     */
    @GetMapping("/{id}")
    public ResponseEntity<LeadDetailResponseDTO> getLead(@PathVariable UUID id) {
        return ResponseEntity.ok(leadService.getLead(id));
    }

    /**
     * Callback consumed by n8n after GPT-4o structured qualification (Phase 3).
     */
    @PutMapping("/{id}/qualification")
    public ResponseEntity<LeadDetailResponseDTO> applyQualification(
            @PathVariable UUID id, @Valid @RequestBody LeadQualificationCallbackDTO callback) {
        return ResponseEntity.ok(leadService.applyQualification(id, callback));
    }
}
