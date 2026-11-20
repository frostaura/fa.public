---
name: fa-public-state
description: "Dormant code, live site: frostaura.net still serves the 2026-09-16 build and its /api answers (2026-11-20), deployed by nothing in the repo; engineering untouched since 2026-04-06; main ahead-only of origin by context commits"
type: state
last_verified: 2026-11-20
---

# Current state

_Re-verified 2026-11-20 by inspection: `git fetch` (succeeded), `git ls-remote origin`, branch, `rev-list --left-right @{u}...HEAD`, `log @{u}..HEAD`, `status --porcelain`, `.git` lock sweep, `gh repo view`, `gh run list`, read-only `curl` probes of `frostaura.net`. Test files counted by reading; no gate was executed. No dev clone exists under `~/src/`._

**Dormant code.** The last commit touching `src/` is 2026-07-30 (`d0efbd4`, content: the retired TaleWeaver entry removed from `siteContent.ts` and the landing-page reference); the last engineering commit is 2026-04-06. Every commit since is context-file upkeep. `docs/architecture/` is untouched since 2026-04-06.

**Git topology: ahead-only, context commits unpushed.** `main` tracks `origin/main`, whose tip is still the 2026-09-16 context commit `e06cad2` (`ls-remote` and a fresh fetch agree; GitHub's last push is 2026-09-16). Local `main` is not behind it and is ahead by context-only commits: the 2026-10-14 memory-store refresh (`687a673`) and the 2026-10-22 re-validation, committed on 2026-10-24 (`1025067`). The tree was clean and lock-free before the 2026-11-20 pass, whose edits were left uncommitted for the owner. The GitHub repository is **public**, and any push to `main` republishes `:latest` — so pushing is both a publication and an image release (see questions). Fetch before repeating any of this.

**The site is live, and this repo does not say how.** On 2026-11-20 `https://frostaura.net` returned 200 through Cloudflare with this repo's `<title>` and `Last-Modified: 2026-09-16 20:48:49 GMT` — unchanged since the 2026-10-22 probe, and matching the 2026-09-16 20:48Z image-workflow run, so the served web image is probably that run's `:latest` *(inferred)*. `GET /api/careers/submissions` and `/api/investors/submissions` returned **405** — the POST-only routes this repo's controllers declare — so an API answers behind the `/api/` proxy and **the careers and investor funnels are reachable in production**. `/health` returns 200 too, but that is the SPA's `index.html` fallback, not the API (see gotchas). Whether submissions persist across a container recreate, with what backup and which SMTP, is not established — the image's own defaults would lose them (see questions). On 2026-10-14 the same host returned 502; what changed it is unknown. Nothing in `.github/` reaches Portainer or any host, so whatever deploys this lives outside the repo.

**Pipeline.** CI and the image workflow last ran on 2026-09-16, both green on `main` (triggered by context pushes); nothing has run since (`gh run list`, 2026-11-20).

**Gates are thin, not absent, and CI runs all of them.** Two Vitest tests (`App.test.tsx`), three Playwright e2e tests (`tests/e2e/public-site.spec.ts` — the view switch plus both submission flows), and five backend tests: two reaching the submission endpoints, three on the email-settings binding (counted 2026-11-20; last executed green 2026-10-14). Nothing covers accessibility, performance or the rest of the component set. `public/` is empty.

Owner: Dean, sole contributor.
