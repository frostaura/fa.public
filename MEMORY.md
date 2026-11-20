# MEMORY — Technologies/projects/technologies.fa.public

- [Current state](memory/state.md) — Dormant code, live site: frostaura.net serves the 2026-09-16 build and its /api answers, deployed by nothing in the repo. main ahead-only by context commits after a 2026-11-20 push whose CI went red at the Playwright install
- [Live decisions](memory/decisions.md) — Brand artwork vendored so nothing depends on a machine path; EMAIL_* SMTP keys kept though their fa.lifeos sibling is gone; no local skills; images publish from main by intent, but workflow_dispatch is unfenced
- [Gotchas](memory/gotchas.md) — Backend gate hides in npm scripts; any push to main republishes :latest on a live site; the image's default DB path sits outside its volume; unset SMTP drops both emails silently; /health on the web host is the SPA, not the API
- [Open questions](memory/questions.md) — Who deploys the live site, and does it set the DB path and SMTP the image needs; SQLite + EnsureCreated vs the Postgres mandate; no design system; is the landing page a visual target; no analytics; investor funnel; public store
- [Watch list](memory/watch.md) — Live site still advertises the killed Life OS and Startup, plus phantom programmes, searches into empty divisions, present-tense hiring and revenue as fact; no gate tests the brand bar; vendored residue incl. a dead mcp.json
