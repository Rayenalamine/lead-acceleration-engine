# AI Lead Acceleration Engine — Backend

Spring Boot 3 REST API for async lead ingestion, PostgreSQL persistence, and non-blocking n8n webhook dispatch.

## Prerequisites

- JDK 17+
- Maven 3.9+
- PostgreSQL 15+ (or use the root `docker-compose.yml`)

## Configuration

| Variable | Default | Description |
|---|---|---|
| `DB_URL` | `jdbc:postgresql://localhost:5432/lead_engine` | JDBC URL |
| `DB_USERNAME` | `leadengine` | DB user |
| `DB_PASSWORD` | `leadengine` | DB password |
| `N8N_WEBHOOK_URL` | `http://localhost:5678/webhook/lead-qualify` | n8n webhook |

## Run

```bash
mvn spring-boot:run
```

API base: `http://localhost:8080`

## Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/leads` | Submit lead → `202 Accepted` |
| `GET` | `/api/v1/leads/{id}` | Poll lead status / details |
| `PUT` | `/api/v1/leads/{id}/qualification` | n8n qualification callback |
