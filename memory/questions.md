---
name: fa-public-questions
description: "SQLite holding PII vs the Postgres mandate; no design system on the brand front door; landing-reference implementation status; zero analytics"
type: question
last_verified: 2026-07-24
---

# Open questions

- **SQLite instead of PostgreSQL.** Re-confirmed 2026-07-24: `Microsoft.EntityFrameworkCore.Sqlite` 10.0.5, no Npgsql anywhere. Documented in `docs/architecture/system-components.md` as the "first public-site baseline" but never flagged against the parent mandate, and that baseline has held for 3.5 months while storing PII. Needs an explicit migration trigger, an owner and a backup story. Owner: Dean.
- **No Tailwind, no shadcn/ui, no design system** on the brand's front door — verified: zero `@radix-ui/*`, no `tailwind.config`, styling is one hand-rolled `src/web/src/styles.css`. This is the one surface where FrostAura's visual posture matters most. Adopt the mandated stack or record a waiver. Owner: Dean, parent-controlled.
- **Has the imported landing-page reference been implemented?** `docs/references/FrostAura_Public_Landing_Page.html` is the stated visual target; nothing says how close the site is. Owner: Dean.
- **Success metrics.** Suggested set (organic visits, careers submissions, investor inbound conversion, Lighthouse score, Playwright pass rate) was never committed to — and **no analytics tooling exists in the repo**, so even the suggestions are uncollectable today. Owner: Dean.
