CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS leads (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name           VARCHAR(150)  NOT NULL,
    email               VARCHAR(255)  NOT NULL,
    company_name        VARCHAR(200)  NOT NULL,
    budget_usd          INTEGER       NOT NULL CHECK (budget_usd >= 1000),
    project_scope       VARCHAR(2000) NOT NULL,
    qualification_score INTEGER       NULL CHECK (
        qualification_score IS NULL
        OR (qualification_score >= 0 AND qualification_score <= 100)
    ),
    lead_status         VARCHAR(32)   NOT NULL DEFAULT 'QUEUED',
    created_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_lead_status CHECK (
        lead_status IN ('QUEUED', 'PROCESSING', 'QUALIFIED', 'DISQUALIFIED', 'FAILED')
    )
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (lead_status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
