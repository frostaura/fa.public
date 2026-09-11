# MEMORY — Technologies/projects/fa.public

- [Current state](memory/state.md) — Early scaffold; engineering untouched since 2026-04-06, one content edit 2026-07-30; local main and origin/main are the same commit — no push decision pending and no un-ratified change set here
- [Live decisions](memory/decisions.md) — Brand artwork is vendored into the repo so nothing depends on a machine-local path; SMTP env keys deliberately mirror fa.lifeos; images publish only from main, with PR runs suppressed
- [Gotchas](memory/gotchas.md) — The backend gate is real but invisible in ci.yml — it hides in npm scripts; no Portainer step, so the deploy chain stops at Docker Hub; careers/investor PII sits on an unbacked-up SQLite volume
- [Open questions](memory/questions.md) — SQLite holds careers and investor PII against the Postgres mandate and has no backup story; no design system on the brand's front door; zero analytics, so no metric is collectable
- [Watch list](memory/watch.md) — The site names five projects that do not exist and gives them delivery stages, while omitting every project built since April; the claimed higher brand bar is contradicted by the gates
