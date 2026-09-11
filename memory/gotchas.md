---
name: fa-public-gotchas
description: "The backend gate is real but invisible in ci.yml — it hides in npm scripts; no Portainer step, so the deploy chain stops at Docker Hub; Vite and the test DOM differ from the sibling frontends"
type: gotcha
last_verified: 2026-09-11
---

# Gotchas

- **The backend gate is real but invisible in the workflow file.** `ci.yml` contains no `dotnet build` or `dotnet test` step — it calls `npm run lint` / `build` / `test`, and those scripts fan out to `dotnet format --verify-no-changes`, `dotnet build src/backend/FrostAura.slnx` and `dotnet test`. Reading `ci.yml` alone gives the wrong answer in both directions. The backend suite is genuinely thin — `FrostAura.Tests` holds **two** real test files, the rest of its `.cs` under `obj/` is generated — but it is not vacuous.
- **There is no Portainer redeploy step.** `docker-build-push.yml` stops at the Docker Hub push; no workflow here mentions Portainer. The standard FrostAura deploy chain is incomplete on this repo and an agent will reasonably assume otherwise.
- **Losing the `frostaura-data` volume loses every careers and investor submission.** That hazard, and the SQLite deviation behind it, is one open question: [`questions.md`](questions.md).
- Vite is on **8.x** here while the sibling Technologies frontends are on 7.x, and tests use `happy-dom` rather than `jsdom`. Do not copy a config across without checking.
- `docs/architecture/system-components.md` claims `/docs` is "the source of truth for the system shape". With three files untouched since the scaffold, it is not — treat the code as the source and fix the doc when you next touch it.
- **The vendored Gaia tree is gone from this repo and must not come back**, and nothing had ever wired any of it (no `.mcp.json`, no CI reference). Here the removal is **committed and pushed**, so this repo carries no pending change set — unlike two of its siblings ([`../../memory/state.md`](../../memory/state.md)). Procedure is meant to come from the Gaia plugins, which are authored upstream in Gaia but **not installed on this Mac** (root [`../../../../memory/plugin-roster-drift.md`](../../../../memory/plugin-roster-drift.md)); the evidence behind the rule is [`../../../memory/vendored-skills-verdict.md`](../../../memory/vendored-skills-verdict.md). **Do not read the absent skills as the cause of the stack deviations** — those predate the vendored set and survived it; they are a stack decision, not a tooling gap.
