package com.leadengine.domain;

/**
 * Lifecycle states for an ingested lead as it moves through the qualification pipeline.
 */
public enum LeadStatus {
    QUEUED,
    PROCESSING,
    QUALIFIED,
    DISQUALIFIED,
    FAILED
}
