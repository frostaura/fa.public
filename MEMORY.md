# MEMORY — FrostAura Public (`fa.public`)

_Last verified: 2026-07-24 by the tree-audit pass — `git log`, branch, remote ahead/behind, working tree, `package.json`, `.csproj` set and both CI workflows inspected directly. Verify before trusting anything dated older than ~60 days._

## Current state

**Early scaffold, effectively abandoned.** Seven commits total, ending `1cb205e` (2026-07-24, context files only). The last product commit is **Mon 6 April 2026** (`a1279a7 fix: remove missing public copy from web image`) — ~3.5 months idle, the most dormant project in the division. Two separate "initial commit"s and a commit literally titled `repeat` mark a messy, unreviewed start. Working tree is clean; **one commit unpushed**.

The scaffold is coherent: React 19 SPA under `src/web/`, Redux Toolkit + RTK Query, six components, vendored brand assets, a five-project .NET 10 backend under `src/backend/`, Docker Compose with MailHog, and multi-arch image publishing. But e2e coverage is **a single spec** (`tests/e2e/public-site.spec.ts`), `public/` is empty, and `docs/` is three files untouched since the scaffold.

Owner: Dean, sole contributor.

## Live decisions
- **Brand artwork is vendored into the repo**, not referenced externally — so the app has no machine-specific path dependency at runtime.
- **SMTP env keys mirror `fa.lifeos`** intentionally, for cross-project consistency.
- **Images publish only from `main`**, gated on the CI workflow completing, with PR runs explicitly suppressed.

## Gotchas
- **The backend gate is real but invisible in the workflow file.** `ci.yml` shows no `dotnet build` or `dotnet test` step — it calls `npm run lint` / `build` / `test`, and those npm scripts fan out to `dotnet format --verify-no-changes`, `dotnet build FrostAura.slnx` and `dotnet test FrostAura.slnx`. Reading `ci.yml` alone gives the wrong answer in both directions; read `package.json` scripts with it. The suite it runs is thin — `FrostAura.Tests` is five `.cs` files — but it is not vacuous.
- **There is no Portainer redeploy step.** `docker-build-push.yml` stops at the Docker Hub push. The standard FrostAura deploy chain is incomplete here and an agent will reasonably assume otherwise.
- **Careers and investor PII sits on an unreplicated single-host Docker volume** (`frostaura-data` at `/app/data`) with **no documented backup**. Losing that volume loses every submission.
- **A `.github/mcp/` directory holds a custom .NET MCP server** — schemas, source, Dockerfile and a `README.md` describing it as the Gaia MCP server for project-scoped tasks, memories and self-improvement, with hard completion enforcement on `tasks.mark_done`. It is documented, it is unique to this repo, and nothing records whether it was ever wired up or run.
- Vite is on **8.0.4** here vs 7.x in both siblings; tests use `happy-dom` vs `jsdom` elsewhere.
- `docs/architecture/system-components.md` claims `/docs` is "the source of truth for the system shape". With three files untouched since the scaffold, it cannot be.
- **`.github/skills/` here is an older generation** than the sets vendored into `fa.lifeos`/`crusaders.mainframe` — eight directories, missing `gaia-default-tech-stack` and `gaia-ui-engineering`, and every shared `SKILL.md` differs. There is no `.claude/` directory at all. Do **not** read the missing skills as the cause of the stack deviations below: `crusaders.mainframe` carries both of those skills and hand-rolled every UI primitive anyway.

## Open questions
- **SQLite instead of PostgreSQL.** Re-confirmed 2026-07-24: `Microsoft.EntityFrameworkCore.Sqlite` 10.0.5, no Npgsql anywhere. Documented in `docs/architecture/system-components.md` as the "first public-site baseline" but never flagged against the parent mandate, and that baseline has held for 3.5 months while storing PII. Needs an explicit migration trigger, an owner and a backup story. Owner: Dean.
- **No Tailwind, no shadcn/ui, no design system** on the brand's front door — verified: zero `@radix-ui/*`, no `tailwind.config`, styling is one hand-rolled `src/web/src/styles.css`. This is the one surface where FrostAura's visual posture matters most. Adopt the mandated stack or record a waiver. Owner: Dean, parent-controlled.
- **Has the imported landing-page reference been implemented?** `docs/references/FrostAura_Public_Landing_Page.html` is the stated visual target; nothing says how close the site is. Owner: Dean.
- **Success metrics.** Suggested set (organic visits, careers submissions, investor inbound conversion, Lighthouse score, Playwright pass rate) was never committed to — and **no analytics tooling exists in the repo**, so even the suggestions are uncollectable today. Owner: Dean.

## Watch list
- `CLAUDE.md` asserts a "higher bar for copy, visuals and accessibility" than internal tooling. The evidence contradicts it: one e2e spec, no axe/a11y checks, no Lighthouse, no design system, empty `public/`, no backend test gate. `fa.startup` — internal-facing — has dramatically stronger gates than the brand front door. Either raise the gates or drop the claim.
- Repo layout deviates from the division's `src/backend/` + `src/frontend/` shape: the SPA lives at `src/web/` with its `package.json` at the repo root.
- Doc taxonomy diverges from the division's numbered `UC-`/`ARCH-`/`TEST-` standard with no recorded reason.
- Zero product activity since 2026-04-06 on a live public brand surface.
