---
name: technologies-fa-public-state
description: "Dormant code, live site: frostaura.net serves the 2026-09-16 build and its /api answers, deployed by nothing in the repo. main ahead-only by context commits after a 2026-11-20 push whose CI went red at the Playwright install"
type: state
last_verified: 2026-11-20
---

# Current state

_Re-verified 2026-11-20 with `git ls-remote origin`, `branch -vv`, `rev-list --left-right` against
the remote tip, `status --porcelain`, a `.git` lock sweep, `gh repo view`, `gh run list` and
`gh run view --log-failed`, and read-only `curl` probes of `frostaura.net`. Test files were counted
by reading. No dev clone exists under `~/src/`._

**Dormant code.** The last commit touching `src/` is the 2026-07-30 content edit that removed the
retired TaleWeaver entry from `siteContent.ts`. The last engineering commit is from 2026-04-06.
Every commit since then is context-file upkeep, and `docs/architecture/` has not changed since
2026-04-06.

**Git topology: ahead-only, by context commits.** `main` tracks `origin/main`. It matched the
remote tip pushed on 2026-11-20, which published every earlier context commit and this store, so
the store is public writing now (see questions). The 2026-11-20 kill-reconciliation pass then
committed its context edits locally and did not push them. The tree was clean and lock-free before
that pass. Fetch before repeating any of this.

**Pipeline: red since the 2026-11-20 push.** CI's `validate` job passed lint, build and test, then
failed at `npx playwright install --with-deps chromium`. `ubuntu-latest` now resolves to Ubuntu
26.04, and Playwright 1.59.1 cannot install there. The image workflow therefore **skipped**, so
`:latest` was not republished. Until the runner or the Playwright pin changes, every push to `main`
is red and publishes nothing. Before that run, the last runs were green on 2026-09-16.

**The site is live, and this repo does not say how.** On 2026-11-20 `https://frostaura.net`
returned 200 with `Last-Modified: 2026-09-16 20:48:49 GMT`, which matches the 2026-09-16 image run,
so it is probably that `:latest` *(inferred)*. `GET /api/investors/submissions` returned **405**,
the POST-only route this repo declares, so an API answers behind the `/api/` proxy and the funnels
are reachable in production. Whether submissions persist across a container recreate, and which
SMTP sends the emails, is not established (see questions). Nothing in `.github/` reaches Portainer
or any host.

**The live site advertises two killed products.** Life OS and FrostAura Startup, killed on
2026-11-20, are still in `siteContent.ts` (see watch).

**Gates are thin, not absent.** There are two Vitest tests (`App.test.tsx`) and three Playwright
e2e tests (`tests/e2e/public-site.spec.ts`), one of which asserts a "Life OS" heading. There are
five backend tests. Unit and backend tests ran green on the 2026-11-20 runner. Nothing covers
accessibility, performance or the rest of the component set.

Owner: Dean, sole contributor.
