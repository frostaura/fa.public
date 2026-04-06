# FrostAura Public

FrostAura Public is the monorepo for the FrostAura public website. It contains a responsive React + Redux frontend, a .NET backend for careers and investor submissions, and the local automation needed to run the stack and validate the public flows.

## Stack

| Surface | Technology |
| --- | --- |
| Frontend | React, Redux Toolkit, Vite, Vitest |
| Backend | ASP.NET Core, SQLite, MailKit |
| E2E | Playwright |
| Local stack | Docker Compose, MailHog |

## Repo layout

```text
docs/architecture     Source-of-truth docs for the public-site system
docs/references       Imported design/reference assets
src/web               React + Redux web app source
src/backend           ASP.NET Core API and tests
tests/e2e             Playwright coverage for careers and investors
```

## Getting started

1. Copy `.env.example` to `.env`.
2. Run `npm ci`.
3. Run `dotnet restore src/backend/FrostAura.slnx`.
4. Start the local stack with `make up`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite frontend |
| `npm run dev:api` | Start the ASP.NET Core API |
| `npm run lint` | Run frontend linting and backend format checks |
| `npm run build` | Build the frontend and backend |
| `npm run test` | Run frontend and backend automated tests |
| `npm run e2e` | Run Playwright end-to-end coverage |
| `make up` | Start MailHog, API, and frontend via Docker Compose |
| `make build-images` | Build the production-style Docker images used by Compose and CI |
| `make down` | Stop the local Docker Compose stack |

## Docker images and publish flow

- `src/backend/Dockerfile` builds the ASP.NET Core API runtime image.
- `src/web/Dockerfile` builds the frontend and serves it from Nginx, proxying `/api` to the API container.
- `.github/workflows/docker-build-push.yml` mirrors the LifeOS publish pattern and pushes multi-arch `frostaura-public-backend` and `frostaura-public-web` images after the main CI workflow succeeds.

## Email configuration

The backend intentionally mirrors the LifeOS SMTP-style environment keys for consistency:

- `EMAIL_SERVER`
- `EMAIL_PORT`
- `EMAIL_ACCOUNT`
- `EMAIL_PASSWORD`
- `EMAIL_SENDER_EMAIL`
- `EMAIL_SENDER_NAME`
- `EMAIL_ENABLE_SSL`
- `EMAIL_SUPPORT_EMAIL`
- `APP_URL`

Additional branding keys are documented in `.env.example`.
