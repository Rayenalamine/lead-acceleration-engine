# AI Lead Acceleration & Qualification Engine

Enterprise event-driven stack for async lead ingestion, multi-tier LLM qualification, and real-time frontend status.

## Phases

| Phase | Status | Stack |
|---|---|---|
| 1 Backend | **Implemented** | Spring Boot 3 · PostgreSQL · WebClient · JPA |
| 2 Frontend | **Implemented** | Vite · React 18 · TypeScript · Tailwind |
| 3 Automation | **Implemented** | n8n · OpenAI GPT-4o · CRM callback · Fallback rules |
| 4 Infra | **Implemented** | `docker-compose.yml` (Postgres + n8n + API) · Dockerfile · Demo mode |
| 5 Deploy | Planned | VPS · Nginx · SSL |

---

## Environment Setup

Create a `.env` file at the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Set your OpenAI API key in `.env` for live GPT-4o evaluation:

```env
OPENAI_API_KEY=sk-...
```

**Note:** The `.env` file is git-ignored for security. See `.env.example` for required variables.

---

## Quick start

### 1. Database & n8n Automation Stack

```bash
docker compose up -d postgres n8n
```

- PostgreSQL runs on host port **5433** (container port `5432`).
- n8n Automation runs on host port **5678**.

### 2. Import n8n Qualification Workflow (Optional for Live Mode)
1. Open `http://localhost:5678` in your browser.
2. Go to **Workflows** -> **Import from File**.
3. Select `automation/n8n/workflows/lead_qualification_workflow.json`.
4. Turn the workflow **Active** toggle **ON**.

**Note:** For live n8n mode, you need your `OPENAI_API_KEY` set in `.env`. If omitted, n8n automatically runs deterministic rule-based qualification fallback.

### 3. Run Full Docker Stack (Optional)

For a fully containerized stack:

```bash
docker compose up -d
```

This starts:
- PostgreSQL on port 5433
- n8n on port 5678
- Backend API on port 8081 (in live n8n mode)

To run with demo mode (no n8n required), edit `docker-compose.yml` and set `DEMO_MODE: "true"` in the backend service environment.

### 4. Backend API (Local Dev)

```bash
cd backend
..\.tools\apache-maven-3.9.6\bin\mvn.cmd spring-boot:run
```

API: `http://localhost:8081`

- **Demo mode (`DEMO_MODE=true`)**: Simulated local qualification after ~4s without n8n.
- **Live n8n mode (`DEMO_MODE=false`)**: Full async dispatch to n8n webhook, GPT-4o evaluation, CRM sync, and callback.

### 5. Frontend Intake Portal

```bash
cd frontend
npm install
npm run dev
```

Portal: `http://localhost:5173`

---

## API Contract

### `POST /api/v1/leads` → `202 Accepted`

```json
{
  "fullName": "Alex Rivera",
  "email": "alex@acme.io",
  "companyName": "Acme Systems",
  "budgetUsd": 12500,
  "projectScope": "Automate inbound lead scoring and sync to HubSpot within 60 seconds."
}
```

Response:

```json
{
  "leadId": "b18b4e72-2d12-4217-a169-2f2bbca3d623",
  "status": "QUEUED",
  "timestamp": "2026-09-12T10:50:00Z"
}
```

### `GET /api/v1/leads/{id}`

Returns full lead detail including `qualificationScore` and `status` for polling.

### `PUT /api/v1/leads/{id}/qualification`

n8n callback endpoint:

```json
{
  "status": "QUALIFIED",
  "qualificationScore": 87
}
```

---

## Project Layout

```
/automation
  /n8n
    /workflows
      lead_qualification_workflow.json  Production n8n workflow definition
/backend                                 Spring Boot 3 API (Java 21)
/frontend                                React 18 intake portal
docker-compose.yml                       Full local stack orchestration
.env.example                             Environment variables template
/backend/Dockerfile                      Production container build
```
