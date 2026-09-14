package com.leadengine.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.leadengine.domain.LeadStatus;
import com.leadengine.dto.LeadQualificationCallbackDTO;
import com.leadengine.dto.LeadSubmissionDTO;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.UUID;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class LeadControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("POST /api/v1/leads — Should submit high budget lead and accept immediately with QUEUED status")
    void testSubmitLeadSuccess() throws Exception {
        LeadSubmissionDTO dto = new LeadSubmissionDTO();
        dto.setFullName("Jane Enterprise");
        dto.setEmail("jane@enterprise.com");
        dto.setCompanyName("Enterprise Corp");
        dto.setBudgetUsd(15000);
        dto.setProjectScope("We require an enterprise grade AI lead qualification system with CRM sync");

        mockMvc.perform(post("/api/v1/leads")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.leadId", notNullValue()))
                .andExpect(jsonPath("$.status", is("QUEUED")));
    }

    @Test
    @DisplayName("POST /api/v1/leads — Should reject submission with invalid email")
    void testSubmitLeadInvalidEmail() throws Exception {
        LeadSubmissionDTO dto = new LeadSubmissionDTO();
        dto.setFullName("Bad Email");
        dto.setEmail("not-an-email");
        dto.setCompanyName("Corp");
        dto.setBudgetUsd(5000);
        dto.setProjectScope("Valid scope text that meets length requirements");

        mockMvc.perform(post("/api/v1/leads")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("GET /api/v1/leads/{id} — Should return 404 for non-existent lead")
    void testGetLeadNotFound() throws Exception {
        UUID randomId = UUID.randomUUID();
        mockMvc.perform(get("/api/v1/leads/" + randomId))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("PUT /api/v1/leads/{id}/qualification — Should apply callback result successfully")
    void testApplyQualificationCallback() throws Exception {
        // Step 1: Submit a lead
        LeadSubmissionDTO dto = new LeadSubmissionDTO();
        dto.setFullName("Callback Test");
        dto.setEmail("callback@test.com");
        dto.setCompanyName("Callback Inc");
        dto.setBudgetUsd(20000);
        dto.setProjectScope("Enterprise lead qualification flow integration test");

        MvcResult result = mockMvc.perform(post("/api/v1/leads")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isAccepted())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        String leadIdStr = objectMapper.readTree(responseBody).get("leadId").asText();

        // Step 2: Simulate qualification callback
        LeadQualificationCallbackDTO callbackDTO = new LeadQualificationCallbackDTO();
        callbackDTO.setQualificationScore(88);
        callbackDTO.setStatus(LeadStatus.QUALIFIED);

        mockMvc.perform(put("/api/v1/leads/" + leadIdStr + "/qualification")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(callbackDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.leadId", is(leadIdStr)))
                .andExpect(jsonPath("$.status", is("QUALIFIED")))
                .andExpect(jsonPath("$.qualificationScore", is(88)));
    }
}
