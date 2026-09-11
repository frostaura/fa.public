---
name: fa-public-watch
description: "The site names five projects that do not exist and gives them delivery stages, while omitting every project built since April; the claimed higher brand bar is contradicted by the gates"
type: watch
last_verified: 2026-09-11
---

# Watch list

- **The site's project list is not the portfolio, and it reads as delivery rather than intent.** Verified 2026-09-11 against `src/web/src/content/siteContent.ts`: `projectContent` holds seven entries. Two are real — Life OS and FrostAura Startup. The other five — **Enterprise AI Systems**, **Robotics and Autonomy**, **Protein Folding AI**, **Underwater Network**, **Marine Archaeology Missions** — exist nowhere in the tree as programs. They are blueprint-era themes, and the file gives each a `stage:` that asserts progress: "Commercial delivery", "Capability buildout", "Research acceleration", "Network design", "Mission planning". A visitor reads five live programmes.

  Meanwhile every project actually built since April is absent. The 2026-07-30 edit removed one retired entry and stopped there, which shows the file is maintained reactively, one dead line at a time.

  This is a **parent-controlled brand concern** — the copy is a public claim about what the holding company is building, so it is recorded here and not edited. The durable fix is to decide whether this list is *the registry rendered* or *deliberate positioning*, and to say which in the file itself; otherwise the next edit repeats the pattern. Owner: Dean.
- **The claimed higher bar is not in the gates.** `CLAUDE.md` holds copy, visuals and accessibility here to a higher standard than internal tooling. What exists: one e2e spec, no axe or accessibility check, no Lighthouse, no design system, an empty `public/`, and no backend test step visible in CI. Either raise the gates or drop the claim — a stated standard nothing enforces is worse than an honest silence.
- **Nobody has checked the site against its own visual target.** `docs/references/FrostAura_Public_Landing_Page.html` is the stated reference and nothing records how close the built site is to it. It is a chore, not a decision — cheap to answer by opening both, and it stays undone.
- Repo layout deviates from the division's `src/backend/` + `src/frontend/` shape: the SPA lives at `src/web/` with its `package.json` at the repo root. Doc taxonomy likewise skips the numbered `UC-`/`ARCH-`/`TEST-` standard, with no recorded reason for either.
- Zero engineering activity since 2026-04-06 on a live public brand surface.
