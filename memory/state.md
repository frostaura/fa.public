---
name: fa-public-state
description: "Early scaffold; engineering untouched since 2026-04-06 — most dormant in the division — with one 2026-07-30 content edit; coherent React 19 + .NET 10 shape; 5 unpushed"
type: state
last_verified: 2026-08-21
---

# Current state

_Last verified: 2026-08-21 — `git log`, branch, upstream, ahead/behind, unpushed diff and working tree re-measured. The `package.json`, `.csproj` set and both CI workflows were inspected 2026-07-24 and no commit has touched them since._

**Early scaffold, engineering effectively abandoned.** Eleven commits total. The last *engineering* commit is **Mon 6 April 2026** (`a1279a7 fix: remove missing public copy from web image`) — 4.5 months idle, the most dormant project in the division. Two separate "initial commit"s and a commit literally titled `repeat` mark a messy, unreviewed start.

**One content change has landed since**: `d0efbd4` (2026-07-30) removed the retired TaleWeaver project from `src/web/src/content/siteContent.ts` and the imported landing-page reference. That is the only evidence anyone has looked at this site in four months, and it corrected exactly one of the site's several registry mismatches — see the watch list.

Working tree clean; **five commits unpushed**, `origin/main` 0 behind.

The scaffold is coherent: React 19 SPA under `src/web/`, Redux Toolkit + RTK Query, six components, vendored brand assets, a five-project .NET 10 backend under `src/backend/`, Docker Compose with MailHog, and multi-arch image publishing. But e2e coverage is **a single spec** (`tests/e2e/public-site.spec.ts`), `public/` is empty, and `docs/` is three files untouched since the scaffold.

Owner: Dean, sole contributor.
