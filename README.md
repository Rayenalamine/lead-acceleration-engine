# Enterprise AI Lead Acceleration & Qualification Engine

An event-driven stack for async lead ingestion, semantic NLP qualification, and real-time CRM synchronization.

## Architecture

This project is built using a decoupled microservices architecture:

1. **Interactive Demo Engine (Frontend)**
   - **Stack:** React 18 · TypeScript · Vite · Tailwind CSS
   - **Description:** Contains a hyper-realistic, dynamic AI scoring simulation that runs purely in the browser. Perfect for live sales demos and client presentations without requiring backend deployment.

2. **Core Production Engine (Backend)**
   - **Stack:** Java 21 · Spring Boot 3 · PostgreSQL
   - **Description:** An asynchronous event processor that securely handles lead intake, queues webhooks, and manages transactional data via JPA.

3. **Automation Layer**
   - **Stack:** n8n · OpenAI GPT-4o
   - **Description:** A declarative workflow that receives webhooks from the Spring Boot API, scores intent and budget using GPT-4o, and fires alerts to Slack/CRM.

---

## 🚀 Quick Start (Interactive Frontend Demo)

For sales pitches and client presentations, you only need to run the **Frontend Interactive Showcase**.

```bash
cd frontend
npm install
npm run dev
```

The portal will launch at `http://localhost:5173`. 
*Note: This frontend can be deployed for free on Vercel or Netlify via direct GitHub integration.*

---

## 🛠️ Full Production Stack Deployment

To run the complete end-to-end backend processing engine locally:

### 1. Environment Setup

Create a `.env` file at the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Set your OpenAI API key in `.env` for live GPT-4o evaluation:

```env
OPENAI_API_KEY=sk-...
```

### 2. Launch Docker Services

The repository includes a `docker-compose.yml` for automated infrastructure provisioning.

```bash
docker compose up -d postgres n8n
```

- PostgreSQL runs on host port **5433**.
- n8n Automation runs on host port **5678**.

### 3. Launch Spring Boot API

```bash
cd backend
mvnw spring-boot:run
```

The REST API will be available at `http://localhost:8081`. 

---

## 📖 API Contract Reference

### `POST /api/v1/leads` → `202 Accepted`

```json
{
  "fullName": "Alex Rivera",
  "email": "alex@acme.io",
  "companyName": "Acme Systems",
  "budgetUsd": 15000,
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

---

## Project Topology

```
/automation
  /n8n/workflows/lead_qualification_workflow.json  (Production n8n workflow definition)
/backend                                           (Spring Boot 3 API)
/frontend                                          (React 18 intake portal & interactive demo)
docker-compose.yml                                 (Local infrastructure mesh)
```

