# n8n Automation Workflows

This directory contains the production n8n workflows for the **Enterprise AI Lead Acceleration & Qualification Engine**.

## Included Workflows

### 1. `lead_qualification_workflow.json`
- **Webhook Endpoint**: `POST /webhook/lead-qualify`
- **LLM Qualification**: Calls OpenAI GPT-4o with structured evaluation prompts.
- **Fail-Safe Fallback**: Includes algorithmic backup logic if OpenAI credentials are not configured or rate-limited.
- **CRM Sync Branch**: Simulates HubSpot / Salesforce ingestion for `QUALIFIED` leads.
- **Backend Callback**: Calls back to `PUT /api/v1/leads/{id}/qualification` on the Spring Boot API.

---

## How to Import into n8n

### Option A: Via n8n UI
1. Open n8n (`http://localhost:5678`).
2. Click **Workflows** -> **Import from File**.
3. Select `automation/n8n/workflows/lead_qualification_workflow.json`.
4. Click **Save** and turn the workflow **Active** toggle **ON**.

### Option B: Automatic Auto-Mount
The `docker-compose.yml` mounts `./automation/n8n/workflows` into n8n container storage.

---

## Environment Variables for n8n

To enable live OpenAI GPT-4o evaluation, set the environment variable in `docker-compose.yml` or your `.env` file:

```env
OPENAI_API_KEY=sk-...
```

If `OPENAI_API_KEY` is omitted, the workflow will automatically fall back to deterministic rule-based qualification so your local testing never fails.
