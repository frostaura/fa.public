---
name: fa-public-watch
description: "The site advertises 5 projects that do not exist and omits every real one added since April; claimed 'higher bar' contradicted by the evidence; repo layout + doc taxonomy deviate"
type: watch
last_verified: 2026-08-21
---

# Watch list

- **The site's project list is not the portfolio.** `src/web/src/content/siteContent.ts` presents "Enterprise AI Systems", "Robotics and Autonomy", "Protein Folding AI", "Underwater Network" and "Marine Archaeology Missions" as FrostAura projects. None of the five exists as a directory anywhere in the tree; they are blueprint-era themes rendered as if they were programs. Meanwhile every project actually created since April is missing — `crusaders.mainframe`, `fa.integrations`, `fa.guild`, `fa.reel`, `fa.trimix`, `oceancare-identifier` — and the Technologies card lists only Life OS, FrostAura Startup and "Enterprise AI systems". The 2026-07-30 edit removed retired TaleWeaver and stopped there, which shows the file is maintained reactively, one dead entry at a time.

  This is a **parent-controlled brand concern**: the copy is a public claim about what the holding company is building. Recorded, not edited. The durable fix is to decide whether this list is *the registry rendered* or *deliberate positioning*, and say which in the file.
- `CLAUDE.md` asserts a "higher bar for copy, visuals and accessibility" than internal tooling. The evidence contradicts it: one e2e spec, no axe/a11y checks, no Lighthouse, no design system, empty `public/`, no backend test gate visible in CI. `fa.startup` — internal-facing — has dramatically stronger gates than the brand front door. Either raise the gates or drop the claim.
- Repo layout deviates from the division's `src/backend/` + `src/frontend/` shape: the SPA lives at `src/web/` with its `package.json` at the repo root.
- Doc taxonomy diverges from the division's numbered `UC-`/`ARCH-`/`TEST-` standard with no recorded reason.
- Zero engineering activity since 2026-04-06 on a live public brand surface.
