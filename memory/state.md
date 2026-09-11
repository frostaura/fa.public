---
name: fa-public-state
description: "Early scaffold; engineering untouched since 2026-04-06, one content edit 2026-07-30; ahead-only with a clean tree, no deletions in the range and no un-ratified change set — a push here is uncomplicated"
type: state
last_verified: 2026-09-11
---

# Current state

_Verified 2026-09-11 by inspection: `git log`, branch, remote, `rev-list --left-right @{u}...HEAD`, `status --porcelain`, a `.git` lock sweep, the `.csproj` set, `package.json`, both CI workflows and the site content file._

**Early scaffold, engineering effectively abandoned.** The last commit touching `src/` is **Thu 30 July 2026** (`d0efbd4`) and it was content, not engineering; the last *engineering* commit is **Mon 6 April 2026** (`a1279a7 fix: remove missing public copy from web image`). The history is short and was started twice — two separate "initial commit"s and a commit titled `repeat`.

**Git topology: ahead-only and uncomplicated.** Nothing behind `origin/main`, no deletions in the unpushed range, and the working tree is clean — whatever sits ahead is context work from the last session and fast-forwards on a plain `git push`. No `.git` lock debris. The removal of the vendored Gaia tree and MCP fork was **committed and pushed here** (`7c16d46`, 2026-08-21), so this repo carries no staged, un-ratified change set: `.github/` tracks only its two workflow files. There is no push decision pending on this repo at all.

The 2026-07-30 content change removed the retired TaleWeaver project from `src/web/src/content/siteContent.ts` and from the imported landing-page reference. It is the only evidence anyone has opened this site since April, and it corrected exactly one of the site's registry mismatches — see the watch list.

The scaffold itself is coherent: React 19 SPA under `src/web/`, Redux Toolkit + RTK Query, six components, vendored brand assets, a five-project .NET 10 backend under `src/backend/`, Docker Compose with MailHog, and multi-arch image publishing. The gates are thin: e2e is **a single spec** (`tests/e2e/public-site.spec.ts`), the backend suite is **two real test files** (`SubmissionEndpointsTests.cs`, `EmailSettingsTests.cs`), `public/` is empty, and `docs/` is three files untouched since the scaffold.

Nothing is deployed. Image publishing stops at Docker Hub — the FrostAura deploy chain does not complete here (gotchas).

Owner: Dean, sole contributor.
