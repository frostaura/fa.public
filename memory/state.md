---
name: fa-public-state
description: "Dormant code, live site: frostaura.net serves this SPA and its /api answers (2026-10-22) though nothing in the repo deploys it; engineering untouched since 2026-04-06; main is ahead-only of origin by an unpushed context commit"
type: state
last_verified: 2026-10-22
---

# Current state

_Re-verified 2026-10-22 by inspection: `git fetch`, branch, `rev-list --left-right @{u}...HEAD`, `status --porcelain`, `.git` lock sweep, `git log`, `gh run list`, read-only `curl` probes of `frostaura.net`, both workflows. The gates paragraph is carried from 2026-10-14 and was not re-run. No dev clone exists under `~/src/`._

**Dormant code.** The last commit touching `src/` is 2026-07-30 (`d0efbd4`, content: the retired TaleWeaver entry removed from `siteContent.ts` and the landing-page reference); the last engineering commit is 2026-04-06. Every commit since is context-file upkeep. `docs/architecture/` is untouched since 2026-04-06.

**Git topology: ahead-only, context commits unpushed.** `main` tracks `origin/main`, is not behind it, and is ahead by the 2026-10-14 memory-store refresh (`687a673`, context files only), which was committed and never pushed. No lock debris. The 2026-10-22 audit run left its context edits uncommitted for the owner. The GitHub repository is **public**, and any push to `main` republishes `:latest` — so pushing a context commit is both a publication and an image release (see questions). Fetch before repeating any of this.

**The site is live, and this repo does not say how.** On 2026-10-22 `https://frostaura.net` returned 200 through Cloudflare with this repo's `index.html` title and hashed Vite assets including the vendored logo, `Last-Modified: 2026-09-16 20:48:49 GMT`. That timestamp coincides with the 2026-09-16 20:48Z image-workflow run, so the served web image is probably that run's `:latest` *(inferred)*. `GET /api/careers/submissions` and `/api/investors/submissions` returned **405** — the POST-only routes this repo's controllers declare — so an API answers behind the `/api/` proxy and **the careers and investor funnels are reachable in production**. Whether submissions persist, to which volume, with what backup and which SMTP, is not established. On 2026-10-14 the same host returned 502; what changed it is unknown. Nothing in `.github/` reaches Portainer or any host, so whatever deploys this lives outside the repo.

**Pipeline.** CI and the image workflow last ran on 2026-09-16, both green on `main` (triggered by context pushes); nothing has run since.

**Gates are thin, not absent, and CI runs all of them** (2026-10-14): two Vitest tests (`App.test.tsx`), three Playwright e2e tests (`tests/e2e/public-site.spec.ts` — the view switch plus both submission flows), and a backend suite reaching the submission endpoints and the email-settings binding. Nothing covers accessibility, performance or the rest of the component set. `public/` is empty.

Owner: Dean, sole contributor.
