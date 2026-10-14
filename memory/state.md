---
name: fa-public-state
description: "Dormant scaffold: engineering untouched since 2026-04-06, last content edit 2026-07-30; CI green and images published to Docker Hub, nothing deployed; public repo, in sync with origin/main on a clean tree"
type: state
last_verified: 2026-10-14
---

# Current state

_Verified 2026-10-14 by inspection: `git fetch`, branch, `rev-list --left-right @{u}...HEAD`, `status --porcelain`, `.git` lock sweep, `git log` per path, `gh repo view`, `gh run list`, the Docker Hub repository API, the `.csproj` set, `package.json`, both workflows, the test files and `siteContent.ts`. No dev clone exists under `~/src/`._

**Dormant scaffold.** The last commit touching `src/` is 2026-07-30 (`d0efbd4`, content: the retired TaleWeaver entry removed from `siteContent.ts` and the landing-page reference); the last engineering commit is 2026-04-06. Every commit since is context-file upkeep. `docs/architecture/` is untouched since 2026-04-06; `docs/references/` was touched once since, by that same 2026-07-30 edit.

**Git topology: in sync, public, no pending decision.** `main` tracks `origin/main`; nothing is ahead, behind or uncommitted, and there is no lock debris. The GitHub repository is **public**, so everything in this store is published the moment it is pushed (see questions). Treat the in-sync reading as dated — fetch before repeating it.

**Pipeline: runs, publishes, deploys nothing.** CI and the image workflow last ran on 2026-09-16, both green on `main` (triggered by context pushes), and `frostaura/frostaura-public-web` and `-backend` on Docker Hub were last updated that evening. No workflow reaches Portainer and no deployment was found, so the careers and investor funnels persist nothing in production. `frostaura.net` returned HTTP 502 on 2026-10-14; nothing in this repo names it as this site's host, so that is not evidence either way.

**The scaffold is coherent:** React 19 SPA under `src/web/`, Redux Toolkit + RTK Query, hand-rolled components and CSS, vendored brand assets, a five-project .NET 10 backend under `src/backend/`, Docker Compose with MailHog, multi-arch image publishing.

**Gates are thin, not absent, and CI runs all of them:** two Vitest tests (`App.test.tsx` — hero copy, one architecture-panel switch), three Playwright e2e tests (`tests/e2e/public-site.spec.ts` — the view switch plus both submission flows), and a backend suite reaching the submission endpoints and the email-settings binding. Nothing covers accessibility, performance or the rest of the component set. `public/` is empty.

Owner: Dean, sole contributor.
