# MEMORY — Technologies/projects/fa.public

- [Current state](memory/state.md) — Dormant code, live site: frostaura.net serves this SPA and its /api answers (2026-10-22) though nothing in the repo deploys it; engineering untouched since 2026-04-06; main is ahead-only of origin by an unpushed context commit
- [Live decisions](memory/decisions.md) — Brand artwork vendored so nothing depends on a machine path; SMTP keys mirror fa.lifeos; no local skills after the 2026-08-21 de-vendoring; images publish from main by intent, but workflow_dispatch is unfenced
- [Gotchas](memory/gotchas.md) — Backend gate hides in npm scripts, not ci.yml; every push to main, a context-only push included, republishes :latest and the site is live; .dockerignore is gitignored; source-of-truth claim lives in two files; decoy asset dirs
- [Open questions](memory/questions.md) — Who deploys the now-live site, and from what; SQLite with EnsureCreated holds live funnels against the Postgres mandate, no migrations or backup; no design system; zero analytics; a live investor funnel; a public store
- [Watch list](memory/watch.md) — Site copy claims what the tree does not support on four surfaces (phantom programmes, searches into empty divisions, present-tense hiring, revenue as fact); no gate tests the brand bar; vendored residue incl. a dead mcp.json
