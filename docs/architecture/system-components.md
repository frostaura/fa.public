# System components

## Overview

FrostAura Public is a two-runtime public-site system:

1. **React + Redux frontend** for the storytelling site and multi-step submission funnels.
2. **ASP.NET Core API** for careers and investor submission capture, persistence, and auto-response email delivery.

`/docs` is the source of truth for the system shape.

## Frontend

- Single-page React experience rendered from `src/web`.
- Redux Toolkit owns cross-section UI state and the careers/investor form workflows.
- RTK Query handles API mutations for submission delivery.
- FrostAura artwork is copied into repo-managed assets so the app does not depend on machine-specific paths at runtime.

## Backend

- ASP.NET Core API in `src/backend/FrostAura.Api`.
- Application, Domain, and Infrastructure projects isolate HTTP contracts, submission workflows, and external concerns.
- SQLite stores submissions locally for the first public-site baseline.
- SMTP email delivery is implemented with MailKit and mirrors the LifeOS configuration shape.

## Submission flow

1. Visitor completes the careers or investors form.
2. Frontend submits JSON to the API.
3. API persists the submission.
4. API sends a support notification and a branded auto-response email.
5. API returns a submission receipt to the frontend.

## Local stack

- `docker-compose.yml` builds and runs production-style frontend and API images plus MailHog.
- `.env.example` documents the required runtime keys.
- `Makefile` wraps the common stack lifecycle commands.
- CI validates `docker compose build`, and a dedicated workflow publishes multi-arch frontend and API images to Docker Hub after CI succeeds on `main`.
