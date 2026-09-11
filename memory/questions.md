---
name: fa-public-questions
description: "SQLite holds careers and investor PII against the Postgres mandate and has no backup story; no design system on the brand's front door; zero analytics, so no metric is collectable"
type: question
last_verified: 2026-09-11
---

# Open questions

- **SQLite instead of PostgreSQL, holding PII, with no backup.** Re-verified 2026-09-11: `Microsoft.EntityFrameworkCore.Sqlite` 10.0.5 in `FrostAura.Infrastructure` and in the test project, and no Npgsql reference anywhere in the repo. `docs/architecture/system-components.md` calls it the "first public-site baseline" but never flags it against the parent mandate, and that baseline has now held for five months while storing careers and investor submissions on an unreplicated volume. Needs three things, not one: a migration trigger, an owner, and a backup story. Owner: Dean.
- **No Tailwind, no shadcn/ui, no design system on the brand's front door.** Re-verified 2026-09-11: zero `@radix-ui/*` dependencies, no `tailwind.config`, no `components.json`; styling is one hand-rolled `src/web/src/styles.css`. This is the surface where FrostAura's visual posture matters most. Adopt the mandated stack or record a waiver — the deviation has never been declared either way. Owner: Dean, parent-controlled.
- **What are the success metrics, and what would collect them?** A suggested set (organic visits, careers submissions, investor inbound conversion, Lighthouse score, Playwright pass rate) was never committed to, and **no analytics tooling exists in the repo** — verified 2026-09-11 by searching the frontend for any analytics or tag script. So even the suggestions are uncollectable today; the instrumentation decision has to come before the metric decision. Owner: Dean.
