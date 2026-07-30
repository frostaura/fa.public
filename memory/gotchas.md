---
name: fa-public-gotchas
description: "Backend CI gate real but hidden in npm scripts; no Portainer step; careers/investor PII on an unbacked-up SQLite volume; unexplained .github/mcp server"
type: gotcha
last_verified: 2026-07-24
---

# Gotchas

- **The backend gate is real but invisible in the workflow file.** `ci.yml` shows no `dotnet build` or `dotnet test` step — it calls `npm run lint` / `build` / `test`, and those npm scripts fan out to `dotnet format --verify-no-changes`, `dotnet build FrostAura.slnx` and `dotnet test FrostAura.slnx`. Reading `ci.yml` alone gives the wrong answer in both directions; read `package.json` scripts with it. The suite it runs is thin — `FrostAura.Tests` is five `.cs` files — but it is not vacuous.
- **There is no Portainer redeploy step.** `docker-build-push.yml` stops at the Docker Hub push. The standard FrostAura deploy chain is incomplete here and an agent will reasonably assume otherwise.
- **Careers and investor PII sits on an unreplicated single-host Docker volume** (`frostaura-data` at `/app/data`) with **no documented backup**. Losing that volume loses every submission.
- **A `.github/mcp/` directory holds a custom .NET MCP server** — schemas, source, Dockerfile and a `README.md` describing it as the Gaia MCP server for project-scoped tasks, memories and self-improvement, with hard completion enforcement on `tasks.mark_done`. It is documented, it is unique to this repo, and nothing records whether it was ever wired up or run.
- Vite is on **8.0.4** here vs 7.x in both siblings; tests use `happy-dom` vs `jsdom` elsewhere.
- `docs/architecture/system-components.md` claims `/docs` is "the source of truth for the system shape". With three files untouched since the scaffold, it cannot be.
- **`.github/skills/` here is an older generation** than the sets vendored into `fa.lifeos`/`crusaders.mainframe` — eight directories, missing `gaia-default-tech-stack` and `gaia-ui-engineering`, and every shared `SKILL.md` differs. There is no `.claude/` directory at all. Do **not** read the missing skills as the cause of the stack deviations below: `crusaders.mainframe` carries both of those skills and hand-rolled every UI primitive anyway.
