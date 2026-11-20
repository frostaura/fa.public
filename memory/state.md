---
name: technologies-fa-public-state
description: "Repo fixed 2026-11-20: killed products gone, Labs listed, images published then deleted, CI paused. frostaura.net still serves the 2026-09-16 build advertising killed products, from a deploy nothing records."
type: state
last_verified: 2026-11-20
---

# Current state

_Re-verified late 2026-11-20 with `git fetch` and `rev-list --left-right` in both clones, `git show`
on the night's commits, `gh workflow list`, `gh run list`, Docker Hub's repository API, and read-only
`curl` probes of `frostaura.net` and its live JS bundle._

**Code moved on 2026-11-20, after seven dormant months.** Four product commits landed that night:
`c437a36` removed killed products and dormant divisions from the site, its forms and the API's
accepted options (the API now answers 400 on any other value), with unit tests asserting every removed
name is absent; `b316f7d` pinned every CI job to `ubuntu-24.04` and added a typecheck gate;
`22efe56` moved the backend packages off advisory versions; `7cf86ff` carried the repo rename into
the image and package names and the site copy. The site now names Technologies' three products
(Crusaders Squash Control System, Gaia, the website) and Labs' three (Reel, Trimix, StoryTime).

**Git topology: level.** Two clones, both on `main` and level with `origin/main` at the time of
writing: the iCloud clone and `~/src/technologies.fa.public`, a fresh clone made that night (it lacks
the iCloud clone's untracked residue — see gotchas). The repo is public by the founder's 2026-11-20
decision ([decisions](decisions.md)). Fetch before repeating any of this.

**Pipeline: green, then paused.** CI and both image runs succeeded on `7cf86ff`, publishing
`frostaura/technologies.fa.public-backend` and `-web` `:latest`. The founder then disabled both
workflows (`disabled_manually`), so nothing builds or publishes until they are re-enabled. The old
`frostaura-public-*` image repositories were deleted on the founder's instruction that night (404),
and **by the last check so were the new ones**: Docker Hub listed zero repositories in the
`frostaura` namespace, so no image of this site exists until CI publishes again. Whether the new
names were meant to go is unrecorded.

**The site is live, and this repo does not say how.** On 2026-11-20 `https://frostaura.net` returned
200 with `Last-Modified: 2026-09-16 20:48:49 GMT`, and its JS bundle still contains "Life OS",
"FrostAura Startup" and "Protein Folding AI": production is the 2026-09-16 build, so **the live site
still advertises killed products** although the repo no longer does. `GET /api/investors/submissions`
returned **405**, so an API answers and the funnels are reachable. The deployment is unrecorded and
probably tracks the old `frostaura-public-*` names *(inferred)*; with those deleted it **cannot
re-pull**, keeps running what it has, and shows the new site only once CI republishes and it is
repointed at the new names
([questions](questions.md)). Nothing in `.github/` reaches Portainer or any host.

**Gates are thin, not absent.** Vitest (`App.test.tsx`, including the removed-names guard), three
Playwright e2e tests (`tests/e2e/public-site.spec.ts`, now asserting the new project list), backend
tests including the rejected-option cases, and the typecheck. Nothing covers accessibility or
performance.

Owner: Dean, sole contributor.
