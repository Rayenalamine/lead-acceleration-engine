# System Architecture & Technical Specification

**Project:** Enterprise Lead Acceleration & Qualification Engine  
**Status:** Core System Complete ✅ | Production Ready 🚀

---

## 🎯 Executive Overview

The **Enterprise Lead Acceleration Engine** is an asynchronous full-stack B2B lead ingestion, scoring, and automated qualification platform. Incoming leads are ingested via Spring Boot REST APIs, stored in PostgreSQL, and processed through an automated workflow utilizing OpenAI GPT-4o for intelligent lead qualification, scoring, and automated CRM synchronization.

### System Architecture Stack

| Layer | Technology | Key Capabilities |
|---|---|---|
| **Backend API** | Java 21 / Spring Boot 3 | JPA Data Access, WebClient Reactive Dispatch, Custom Exception Handling |
| **Frontend Portal** | React 18 / TypeScript / Vite | Tailwind CSS, Real-Time Interactive Demo Engine |
| **Automation Engine** | n8n / OpenAI GPT-4o | Async Webhook Handler, LLM Lead Qualification, Fallback Evaluator |
| **Data Layer** | PostgreSQL | Relational Persistence, Schema Scripts (`schema.sql`), Migration Ready |
| **Infrastructure** | Docker & Docker Compose | Containerized Multi-Service Mesh (PostgreSQL, n8n, API) |

---

## 🧪 System Verification

### 1. Spring Boot Integration Tests
- **Suite:** `com.leadengine.controller.LeadControllerTest`
- **Results:** 100% Pass Rate
- **Scenarios Covered:**
  - Asynchronous lead submission (`POST /api/v1/leads` returning `202 ACCEPTED`).
  - Validation enforcement on email and budget parameters.
  - Asynchronous qualification callback processing (`PUT /api/v1/leads/{id}/qualification`).

### 2. Frontend Production Build
- **Tooling:** Vite v5.4 & TypeScript Compiler
- **Results:** 100% Type-Safe Build Success
- **Output:** Clean production bundle generated in `frontend/dist/`.

---

## 📦 Service Topology & Configuration

### Docker Infrastructure (`docker-compose.yml`)

- **PostgreSQL**: Internal port `5432` / Host port `5433` (Database: `lead_engine`).
- **n8n Automation Engine**: Port `5678` (Webhook URL: `/webhook/lead-qualify`).
- **Spring Boot API**: Port `8081` (Java 21 execution environment).

### Environment Setup (`.env`)

Copy template to root:
```bash
cp .env.example .env
```

Environment variables:
```env
OPENAI_API_KEY=sk-...  # Required for live GPT-4o qualification
```
