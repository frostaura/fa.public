# MEMORY — FrostAura Public (`fa.public`)

_Last verified: 2026-07-20 by direct inspection (git log/branch/remote/status, manifests, CI files). Verify before trusting anything dated older than ~60 days._

## Current state
**Early scaffold, effectively abandoned.** Six commits total — `bd93328 Initial commit` → `ed17eba chore(cleanup)` → `9d08243 feat(init): initial commit` → `de289d2 repeat` → `52793ff fix(tests)` → `a1279a7 fix: remove missing public copy from web image`. Last commit **Mon 6 April 2026, 19:02 SAST** on `main` — ~3.5 months idle, the most dormant project in the division. Two separate "initial commit"s and a commit literally titled `repeat` indicate a messy, unreviewed start.

The scaffold itself is coherent: frontend, Redux store, six components, vendored brand assets, a five-project backend, Docker Compose with MailHog, and CI that lints, builds, tests, runs Playwright and does a `docker compose build`. But e2e coverage is **a single file** (`tests/e2e/public-site.spec.ts`), the `public/` directory is **empty**, and `docs/` is three files untouched since the scaffold.

Owner: Dean, sole contributor.

## Live decisions
- **Brand artwork is vendored into the repo**, not referenced externally — so the app has no machine-specific path dependency at runtime.
- **SMTP env keys mirror `fa.lifeos`** intentionally, for cross-project consistency.
- **Images publish only from `main`**, gated on the CI workflow completing, with PR runs explicitly suppressed.

## Gotchas
- **`CLAUDE.md` is untracked by git.** Not in the GitHub repo — a clone gives no project context. Commit it.
- **There is no Portainer redeploy step.** Unlike `fa.lifeos` and `fa.startup`, CI stops at the Docker Hub push. The standard FrostAura deploy chain is incomplete here and an agent will reasonably assume otherwise.
- **Careers and investor PII sits on an unreplicated single-host Docker volume** (`frostaura-data` at `/app/data`) with **no documented backup**. Losing that volume loses every submission.
- **`.github/skills/` is missing `gaia-default-tech-stack` and `gaia-ui-engineering`**, and there is no `.claude/` directory at all. Tempting to read as the cause of the stack deviations below — but it is not: `crusaders.mainframe` carries **both** of those skills and still hand-rolled every UI primitive. Vendoring the skills here would not have enforced anything.
- **A `.github/mcp/` directory holds a custom .NET MCP server** — `schemas/`, `src/`, a Dockerfile and a `README.md` describing it as the Gaia MCP server for project-scoped tasks, memories and self-improvement, with hard completion enforcement on `tasks.mark_done`. It **is** documented (the 2026-07-19 audit wrongly said it was not), but it is unique to this repo and nothing records whether it was ever wired up or run.
- Vite is on **8.0.4** here vs 7.x in both siblings; tests use `happy-dom` vs `jsdom` elsewhere.
- `docs/architecture/system-components.md` claims `/docs` is "the source of truth for the system shape". With three files untouched since the scaffold, it cannot be.

## Open questions
- **SQLite instead of PostgreSQL.** Documented in `docs/architecture/system-components.md` as the "first public-site baseline", but never flagged against the parent mandate, and the baseline has now stood unchanged for 3.5 months while holding PII. Needs an explicit migration trigger, an owner, and a backup story. Owner: Dean.
- **No Tailwind, no shadcn/ui, no design system** on the brand's front door — the one surface where FrostAura's frosty/glass, light-blue-on-dark-blue posture matters most. Adopt the mandated stack or record a waiver, and add the missing `gaia-ui-engineering` / `gaia-default-tech-stack` skills so the next agent is constrained correctly. Owner: Dean, parent-controlled.
- **Has the imported landing-page reference been implemented?** `docs/references/FrostAura_Public_Landing_Page.html` is the stated visual target; nothing says how close the site is or what remains. Owner: Dean.
- **Success metrics.** Suggested set (organic visits, careers submissions, investor inbound conversion, Lighthouse score, Playwright pass rate) was never committed to — and **no analytics tooling exists in the repo**, so even the suggestions are uncollectable today. Owner: Dean.

## Watch list
- `CLAUDE.md` asserts a "higher bar for copy, visuals and accessibility" than internal tooling. The evidence contradicts it: one e2e spec, no axe/a11y checks in CI, no Lighthouse, no design system, empty `public/`. `fa.startup` — internal-facing — has dramatically stronger quality gates than the brand front door. Either raise the gates or drop the claim.
- Doc taxonomy diverges from the division standard with no recorded reason.
- Zero activity since 2026-04-06 — 3.5 months as of 2026-07-20 — on a live public brand surface. Repo is level with `origin/main`.
