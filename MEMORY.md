# MEMORY — Technologies/projects/technologies.fa.public

- [Current state](memory/state.md) — Repo fixed 2026-11-20: killed products gone, Labs listed, images published then deleted, CI paused. frostaura.net still serves the 2026-09-16 build advertising killed products, from a deploy nothing records.
- [Live decisions](memory/decisions.md) — Brand artwork vendored; EMAIL_* SMTP keys kept though fa.lifeos is gone; runners pinned to ubuntu-24.04 for Playwright; this store is public writing by decision; images publish from main by intent, but dispatch is unfenced
- [Gotchas](memory/gotchas.md) — Backend gate hides in npm scripts; with CI on, any push to main republishes :latest; the image's default DB path sits outside its volume; unset SMTP drops both emails silently; /health on the web host is the SPA, not the API
- [Open questions](memory/questions.md) — Who deploys the live site, and does it set the DB path and SMTP the image needs; SQLite + EnsureCreated vs the Postgres mandate; no design system; is the landing page a visual target; no analytics; investor funnel
- [Watch list](memory/watch.md) — Repo fixed, production not: frostaura.net still serves the build naming killed products. Present-tense hiring and a Revenue engine label remain; no gate tests the brand bar; vendored residue incl. a dead mcp.json
