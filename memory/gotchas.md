---
name: fa-public-gotchas
description: "Backend gate hides in npm scripts, not ci.yml; every push to main, a context-only push included, republishes :latest; chain stops at Docker Hub; source-of-truth claim lives in two files; decoy asset dirs"
type: gotcha
last_verified: 2026-10-14
---

# Gotchas

- **The backend gate is real but invisible in `ci.yml`.** The general trap is the division's ([`../../../memory/gotchas.md`](../../../memory/gotchas.md)); here, the only direct .NET step is `dotnet restore` — `npm run lint` / `build` / `test` fan out to `dotnet format --verify-no-changes`, `dotnet build src/backend/FrostAura.slnx` and `dotnet test`. A skim concludes the backend is absent; it is hidden.
- **Any push to `main` republishes the images.** CI runs on every push and the image workflow fires on its success, with no path filter — the 2026-09-16 context-only pushes each rebuilt and re-pointed `:latest` on Docker Hub. Harmless while nothing deploys; once a Portainer step exists, a memory edit is a release.
- **There is no Portainer step.** `docker-build-push.yml` stops at the Docker Hub push; nothing in `.github/` mentions Portainer. The standard deploy chain does not complete here.
- **"`/docs` is the source of truth" is written twice** — `docs/architecture/system-components.md:10` and the repo-layout block in `README.md`. With the architecture docs untouched since the scaffold, neither is true; treat the code as the source, and correct both files in one pass or the claim survives in the other.
- **The local dev database holds test fixtures only.** `src/backend/FrostAura.Api/frostaura.development.db` is untracked (`.gitignore` `**/*.db*`); inspected on a scratch copy 2026-10-14, both submission tables hold only `example.com` rows dated 2026-04-06. Not a PII store today — but it is where real data would land if the API were pointed at it, so never commit it. The untracked `.env` is a byte-identical copy of `.env.example` written by `make ensure-env`, and holds no secret.
- **Three empty untracked directories read as a second asset location** — `src/web/assets/brand/`, `src/web/careers/`, `src/web/investors/`. The real artwork is `src/web/src/assets/brand/`; an asset dropped in the wrong one fails silently at build.
- Vite is on **8.x** and tests use `happy-dom`, not `jsdom`. Do not copy a frontend config in from a sibling unchecked; the cross-repo comparison is the division's ([`../../../memory/frontend-fracture.md`](../../../memory/frontend-fracture.md)).
