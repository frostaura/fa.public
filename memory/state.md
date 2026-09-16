---
name: fa-public-state
description: "Early scaffold; engineering untouched since 2026-04-06, one content edit 2026-07-30; ahead-only with no deletions in the unpushed range and no un-ratified change set — a push here is uncomplicated"
type: state
last_verified: 2026-09-16
---

# Current state

_Re-verified 2026-09-16 by inspection: `git log`, branch, remote, `rev-list --left-right @{u}...HEAD`, `status --porcelain`, a `.git` lock sweep, the `.csproj` set, `package.json`, `vite.config.ts`, both CI workflows, the test files and the site content file. No `git fetch` was run, so the topology is stated against the tracking ref as it stands._

**Early scaffold, engineering effectively abandoned.** The last commit touching `src/` is **Thu 30 July 2026** (`d0efbd4`) and it was content, not engineering; the last *engineering* commit is **Mon 6 April 2026** (`a1279a7 fix: remove missing public copy from web image`). The history is short and was started twice — two separate "initial commit"s and a commit titled `repeat`.

**Git topology: ahead-only and uncomplicated.** Nothing behind `origin/main`, no deletions in the unpushed range, and every unpushed commit touches context files only — a plain push fast-forwards and carries no product change. No `.git` lock debris. The removal of the vendored Gaia tree and MCP fork was **committed and pushed here** (`7c16d46`, 2026-08-21), so this repo carries no staged, un-ratified change set: `.github/` tracks only its two workflow files. There is no push decision pending on this repo at all. The 2026-09-16 audit pass deliberately left its own context edits uncommitted for the owner.

The 2026-07-30 content change removed the retired TaleWeaver project from `src/web/src/content/siteContent.ts` and from the imported landing-page reference. It is the only evidence anyone has opened this site since April, and it corrected exactly one of the site's registry mismatches — see the watch list.

The scaffold itself is coherent: React 19 SPA under `src/web/`, Redux Toolkit + RTK Query, a small hand-rolled component set, vendored brand assets, a .NET 10 backend under `src/backend/`, Docker Compose with MailHog, and multi-arch image publishing.

**The gates are thin rather than absent, and CI runs all three.** A Vitest suite of two frontend tests (`src/web/src/App.test.tsx` — hero copy, and one architecture-panel switch), three Playwright e2e tests (`tests/e2e/public-site.spec.ts` — the landing/view switch plus both full submission flows), and a backend suite whose reach is the submission endpoints and the email-settings binding. Nothing covers accessibility, performance or the rest of the component set.

`public/` is empty. **`docs/architecture/` has not been touched since the 2026-04-06 scaffold**; the imported landing-page reference under `docs/references/` was edited once since, on 2026-07-30, by the TaleWeaver removal — the two must not be collapsed into "`docs/` is untouched".

Nothing is deployed. Image publishing stops at Docker Hub — the FrostAura deploy chain does not complete here (gotchas).

Owner: Dean, sole contributor.
