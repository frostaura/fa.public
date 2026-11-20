# MEMORY — Technologies/projects/fa.public

- [Current state](memory/state.md) — Dormant code, live site: frostaura.net still serves the 2026-09-16 build and its /api answers (2026-11-20), deployed by nothing in the repo; engineering untouched since 2026-04-06; main ahead-only of origin by context commits
- [Live decisions](memory/decisions.md) — Brand artwork vendored so nothing depends on a machine path; SMTP keys mirror fa.lifeos; no local skills after the 2026-08-21 de-vendoring; images publish from main by intent, but workflow_dispatch is unfenced
- [Gotchas](memory/gotchas.md) — Backend gate hides in npm scripts; any push to main republishes :latest on a live site; the image's default DB path sits outside its volume; unset SMTP drops both emails silently; /health on the web host is the SPA, not the API
- [Open questions](memory/questions.md) — Who deploys the live site, and does it set the DB path and SMTP the image needs; SQLite + EnsureCreated vs the Postgres mandate; no design system; is the landing page a visual target; no analytics; investor funnel; public store
- [Watch list](memory/watch.md) — Site copy claims what the tree does not support on four surfaces (phantom programmes, searches into empty divisions, present-tense hiring, revenue as fact); no gate tests the brand bar; vendored residue incl. a dead mcp.json
