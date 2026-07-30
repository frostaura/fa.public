---
name: fa-public-state
description: "Early scaffold, abandoned since 2026-04-06 — most dormant in the division; coherent React 19 + .NET 10 shape; 1 unpushed"
type: state
last_verified: 2026-07-24
---

# Current state

_Last verified: 2026-07-24 by the tree-audit pass — `git log`, branch, remote ahead/behind, working tree, `package.json`, `.csproj` set and both CI workflows inspected directly. Verify before trusting anything dated older than ~60 days._

**Early scaffold, effectively abandoned.** Seven commits total, ending `1cb205e` (2026-07-24, context files only). The last product commit is **Mon 6 April 2026** (`a1279a7 fix: remove missing public copy from web image`) — ~3.5 months idle, the most dormant project in the division. Two separate "initial commit"s and a commit literally titled `repeat` mark a messy, unreviewed start. Working tree is clean; **one commit unpushed**.

The scaffold is coherent: React 19 SPA under `src/web/`, Redux Toolkit + RTK Query, six components, vendored brand assets, a five-project .NET 10 backend under `src/backend/`, Docker Compose with MailHog, and multi-arch image publishing. But e2e coverage is **a single spec** (`tests/e2e/public-site.spec.ts`), `public/` is empty, and `docs/` is three files untouched since the scaffold.

Owner: Dean, sole contributor.
