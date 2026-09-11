# FrostAura Public (`fa.public`)

## What this project is
The monorepo for the FrostAura public-facing website — the surface the world sees first when it encounters the brand. A React 19 + Redux Toolkit single-page marketing and storytelling site, backed by a small ASP.NET Core API that persists **careers** and **investor** submissions and sends branded auto-response email. In production it is served as an Nginx container proxying `/api` to the API container.

## Architecture & key concepts
- **Frontend:** React 19 + TypeScript + Vite, Redux Toolkit with RTK Query (`submissionsApi.ts`). Core components are `CareersForm`, `InvestorsForm`, `CompanyExplorer`, `GuidedSpotlight`, `ProjectCarousel`, `StepperIndicator` — the two forms are multi-step funnels driven by `StepperIndicator`.
- **Backend:** ASP.NET Core 10, five-project clean architecture (`FrostAura.Domain` / `.Application` / `.Infrastructure` / `.Api` / `.Tests`), EF Core, MailKit for outbound mail.
- **The submission flow is a contract, not an implementation detail.** Visitor submits → frontend POSTs JSON → API persists → API sends **both** a support notification **and** a branded auto-response → API returns a receipt. Both emails are part of the flow; dropping either breaks it.
- **Brand artwork is deliberately vendored** into `src/web/src/assets/brand/` (black / gray / white / complex) so the app carries no machine-specific path dependency at runtime. Do not replace it with symlinks or external references.
- **Local stack** is Docker Compose: MailHog + API + web. Persistence is the named Docker volume `frostaura-data` mounted at `/app/data`.

## Stack & repo
.NET 10 + EF Core 10 with **SQLite** (a deviation from the mandated PostgreSQL — see `MEMORY.md`); React 19 + Vite 8 with hand-rolled CSS in `src/web/src/styles.css` and **no Tailwind or shadcn/ui** (also a deviation). Testing uses Vitest with `happy-dom` and Playwright for e2e. Repo: `https://github.com/frostaura/fa.public` (`main`).

Docker images `frostaura-public-backend` and `frostaura-public-web` are published multi-arch by `docker-build-push.yml`, which triggers on `workflow_run` completion of "FrostAura Public CI" on `main` only, with a `pull_request: branches-ignore: ['**']` guard to suppress PR runs.

## Conventions & non-obvious rules
- **This is the brand's front door.** Copy, visuals and accessibility carry a higher bar than internal tooling. Treat content edits as brand-level work, not engineering. Brand and editorial decisions made here set precedent and must be reflected back into root-level brand guidance — this is a **parent-controlled brand concern wearing a division project's clothes**.
- **SMTP environment keys deliberately mirror `fa.lifeos`** — `EMAIL_SERVER`, `EMAIL_PORT`, `EMAIL_ACCOUNT`, `EMAIL_PASSWORD`, `EMAIL_SENDER_EMAIL`, `EMAIL_SENDER_NAME`, `EMAIL_ENABLE_SSL`, `EMAIL_SUPPORT_EMAIL`, `APP_URL`. This is intentional cross-project convention. Do not "clean up" the naming.
- **Careers and investor submissions are the only data-handling flows on this surface.** Both must remain auditable and email-traceable — MailHog locally, configured SMTP in production.
- **`CLAUDE.md` outranks `AGENTS.md` and `README.md`** (the README duplicates the stack table).

## Build, test, run
`Makefile`: `up` (runs `ensure-env` first), `down`, `build-images`, `test`, `ci-local`. Prefer `make up` over running the API and frontend separately — most integration bugs here are stack-shaped.

npm scripts mirror this: `dev`, `dev:api`, `build` (`build:web` + `build:api`), `lint` (eslint `--max-warnings=0` + `dotnet format --verify-no-changes`), `test` (`vitest run` + `dotnet test`), `e2e` (Playwright), and `ci` = lint + build + test. CI is a single `validate` job that also runs `docker compose build`.

## Docs
`docs/architecture/` holds three unnumbered files — `system-components.md`, `ui-ux.md`, `use-cases.md`. This project opts out of the division's numbered `UC-`/`ARCH-`/`TEST-` taxonomy and has no testing docs. `docs/references/FrostAura_Public_Landing_Page.html` is an imported design reference — the visual target the site is meant to match.

## Never do here
- Never drop either half of the two-email submission response.
- Never ship copy or visuals here without treating them as brand output — root brand posture and language apply directly.
- Never assume the standard FrostAura deploy chain runs end-to-end here; it stops at Docker Hub (see `MEMORY.md`).
- Never destroy or recreate the `frostaura-data` volume casually — it holds every careers and investor submission.

## Dependencies on other FrostAura projects
None at runtime. The SMTP key shape is borrowed from `fa.lifeos` as convention only.

## Skills

Because this is the brand's front door, the root local skill `brand-compliance` governs every copy and visual change here and outranks any engineering convenience. That one *is* a file in this tree, so its name is safe to cite directly.

From the installed Gaia plugins: the UI-engineering capability for the React surface (e.g. `fa-engineering-ui`), and the mandated-stack baseline for the two open deviations — SQLite and no design system (e.g. `fa-engineering-default-tech-stack`); read it before treating either as settled.

**Reference a plugin capability by what it does, naming the current skill only as an example — never as the identifier, never by path.** Plugin skills are not files in this repo, so nothing links to them, no checker sees a rename, and a bare name goes dead silently.

This repo carries **no local `.claude/skills/`** and must not reacquire one. Forking a plugin procedure in here is prohibited outright; the reasoning, and what the last such set cost, are in `MEMORY.md`.

## Upkeep
Three artifacts are kept current **as changes land**, not in a later pass: this `CLAUDE.md`, [`MEMORY.md`](MEMORY.md) with its `memory/` topic store, and the skills layer above (empty by decision). `MEMORY.md` is required here exactly as `CLAUDE.md` is, and cascades downward identically; a `CLAUDE.md` with no `MEMORY.md` beside it is a defect.

Update the memory store at the end of any session that shipped, decided, discovered or abandoned something, and restamp `last_verified:` only for what you actually inspected. **Edit the topic files under `memory/`, never `MEMORY.md` itself** — the index is derived from their frontmatter, and a hand-cut entry is silently discarded by the next regeneration. Regenerate it from the tree root with `python3 .claude/scripts/audit-tree.py --no-git --fix-index --scope Technologies/projects/fa.public`; the `--scope` flag is what stops a fan-out agent rewriting a sibling's index mid-flight. This file changes only when a rule changes — a status belongs in `MEMORY.md`. A stale plugin procedure is fixed upstream and reinstalled, never forked back in here. The standard is [`/docs/operating/context-cascade.md`](../../../docs/operating/context-cascade.md).
