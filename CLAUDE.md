# FrostAura Public (`technologies.fa.public`)

## What this project is
The monorepo for the FrostAura public-facing website — the surface the world sees first when it encounters the brand. A React 19 + Redux Toolkit single-page marketing and storytelling site, backed by a small ASP.NET Core API that persists **careers** and **investor** submissions and sends branded auto-response email. Its production shape is an Nginx container serving the built SPA and proxying `/api/` to the API container (`src/web/nginx.conf`); the API's own `/health` route sits outside that proxy and is not reachable through the web host, so a 200 from `/health` there is never evidence the API is up (how to probe instead is in the gotchas topic).

## Architecture & key concepts
- **Frontend:** React 19 + TypeScript + Vite, Redux Toolkit with RTK Query (`submissionsApi.ts`). Core components are `CareersForm`, `InvestorsForm`, `CompanyExplorer`, `GuidedSpotlight`, `ProjectCarousel`, `StepperIndicator`. The two forms are three-step funnels that hold their own step index and render their own inline `progress-step` markup; **`StepperIndicator` is the carousel dot control** (`role="tablist"`), imported only by `ProjectCarousel` and `GuidedSpotlight`. Editing it does not change either form.
- **Backend:** ASP.NET Core 10, five-project clean architecture (`FrostAura.Domain` / `.Application` / `.Infrastructure` / `.Api` / `.Tests`), EF Core, MailKit for outbound mail.
- **The submission flow is a contract, not an implementation detail.** Visitor submits → frontend POSTs JSON → API persists → API sends **both** a support notification **and** a branded auto-response → API returns a receipt. Both emails are part of the flow; dropping either breaks it.
- **Brand artwork is deliberately vendored** into `src/web/src/assets/brand/` (black / gray / white / complex). Do not replace it with symlinks or external references; the why is in `MEMORY.md`.
- **Local stack** is Docker Compose: MailHog + API + web. Persistence is the named Docker volume `frostaura-data` mounted at `/app/data` — **only because `.env` points `ConnectionStrings__DefaultConnection` under `/app/data/`.** Any host running the published image must set that key; the image's own default writes outside its volume (mechanism in the gotchas topic).

## Stack & repo
.NET 10 + EF Core 10 with **SQLite** (a deviation from the mandated PostgreSQL — see `MEMORY.md`); React 19 + Vite 8 with hand-rolled CSS in `src/web/src/styles.css` and **no Tailwind or shadcn/ui** (also a deviation). Testing uses Vitest with `happy-dom` and Playwright for e2e. Repo: `https://github.com/frostaura/technologies.fa.public` (`main`).

Docker images `frostaura-public-backend` and `frostaura-public-web` are published multi-arch by `docker-build-push.yml`. Publishing from `main` is the intent, not what the file enforces: its `workflow_dispatch` path is unfenced, so a manual run from **any** branch publishes and re-points `:latest`. **Treat a dispatch as a release.** The trigger analysis is in `MEMORY.md`.

## Conventions & non-obvious rules
- **This is the brand's front door.** Copy, visuals and accessibility carry a higher bar than internal tooling. Treat content edits as brand-level work, not engineering. Brand and editorial decisions made here set precedent and must be reflected back into root-level brand guidance — this is a **parent-controlled brand concern wearing a division project's clothes**.
- **SMTP environment keys keep their `EMAIL_*` names**, even though no sibling repo shares them any more (provenance and the reason that remains are in the decisions topic) — `EMAIL_SERVER`, `EMAIL_PORT`, `EMAIL_ACCOUNT`, `EMAIL_PASSWORD`, `EMAIL_SENDER_EMAIL`, `EMAIL_SENDER_NAME`, `EMAIL_ENABLE_SSL`, `EMAIL_SUPPORT_EMAIL`, `EMAIL_BRAND_NAME`, `EMAIL_BRAND_OWNER`, `EMAIL_BRAND_PRIMARY_COLOR`, `EMAIL_BRAND_ALERT_COLOR`, `APP_URL`. `EMAIL_TIMEOUT_SECONDS` is this project's own addition. `src/backend/FrostAura.Api/Program.cs` is the authoritative list. Do not "clean up" the naming.
- **Careers and investor submissions are the only data-handling flows on this surface.** Both must remain auditable and email-traceable — MailHog locally, configured SMTP in production.
- **`README.md` duplicates the stack table and loses to this file** on any conflict.

## Build, test, run
`Makefile`: `up` (runs `ensure-env` first), `down`, `build-images`, `test`, `ci-local`. Prefer `make up` over running the API and frontend separately — most integration bugs here are stack-shaped.

npm scripts mirror this: `dev`, `dev:api`, `build` (`build:web` + `build:api`), `lint` (eslint `--max-warnings=0` + `dotnet format --verify-no-changes`), `test` (`vitest run` + `dotnet test`), `e2e` (Playwright), and `ci` = lint + build + test. CI is a single `validate` job that also runs `docker compose build`.

## Docs
`docs/architecture/` holds three unnumbered files — `system-components.md`, `ui-ux.md`, `use-cases.md`. They do not follow the division's numbered `UC-`/`ARCH-`/`TEST-` taxonomy and there are no testing docs — an undeclared departure, not a recorded opt-out (see the watch topic). `docs/references/FrostAura_Public_Landing_Page.html` is an imported design reference; `docs/architecture/ui-ux.md` treats it as the **content and storytelling baseline** and records that the shipped site deliberately departs from its long-scrolling layout for navigation-led views. Do not "restore" the reference's layout; whether it also binds the visuals is an open brand question in `MEMORY.md`.

## Never do here
- Never drop either half of the two-email submission response.
- Never assume the standard FrostAura deploy chain runs end-to-end from this repo: its workflows stop at Docker Hub, and whatever serves the site is configured outside it (see `MEMORY.md`).
- Never destroy or recreate the `frostaura-data` volume casually — it holds every careers and investor submission.

## Dependencies on other FrostAura projects
None, at runtime or by convention.

## Skills

Because this is the brand's front door, the root local skill `brand-compliance` governs every copy and visual change here and outranks any engineering convenience. That one *is* a file in this tree, so its name is safe to cite directly.

From the installed Gaia plugins: the UI-engineering capability for the React surface (e.g. `fa-engineering-ui`), and the mandated-stack baseline for the two open deviations — SQLite and no design system (e.g. `fa-engineering-default-tech-stack`); read it before treating either as settled.

No local `.claude/skills/`; the removed vendored set and its one surviving wiring are in `MEMORY.md`.

## Upkeep

This file, `MEMORY.md`, its `memory/` topic store, and the skills that fire at this level are kept current **as changes land**, not in a later cleanup pass. `MEMORY.md` is required here exactly as this file is, and it cascades downward on identical terms — an instruction file with no `MEMORY.md` beside it is a defect, not a shortcut: the rules are stated and reality is left unstated, so the next agent infers status instead of reading it. Both files, or neither.

- **Memory — always.** Update the topic files at the end of any session that shipped, decided, discovered, abandoned or unblocked something; re-cut the `description:` of any topic whose signal moved, then regenerate `MEMORY.md` from the topic files rather than editing it — from the tree root, `python3 .claude/scripts/audit-tree.py --no-git --fix-index --scope Technologies/projects/technologies.fa.public`; restamp `last_verified:` only for what you actually re-inspected. Record decisions *with their why* — a decision without its rationale is reversed by the next agent, who sees only its cost.
- **This file — only when a rule changed.** A new convention, command or invariant earns an edit. A status change does not; it belongs in the memory store.
- **Skills — when *how* the work is done changed.** Fix or delete a skill whose commands or thresholds no longer exist; a stale skill is worse than a missing one because it fires with authority. A procedure that would be correct in a repository with nothing to do with this tree belongs upstream in a plugin, never forked into this tree.
- **Scratch — always.** Empty `.tmp/` before the session ends, promoting anything that still mattered first.

None of these four are assessed by search. Read the scope's files end to end before changing any of them. Drift is not caused by neglect over months; it is caused by good sessions that ended without a close-out.
