---
name: fa-public-watch
description: "Four live surfaces claim what the tree does not support — five phantom programmes with delivery stages, six searches into empty divisions, present-tense hiring, revenue as fact — and the higher brand bar is in no gate"
type: watch
last_verified: 2026-09-16
---

# Watch list

- **The site asserts as fact what the tree does not support, on four surfaces, not one.** Re-verified 2026-09-16 against `src/web/src/content/siteContent.ts`:
  1. `projectContent` holds seven entries. Two are real — Life OS and FrostAura Startup. The other five — **Enterprise AI Systems**, **Robotics and Autonomy**, **Protein Folding AI**, **Underwater Network**, **Marine Archaeology Missions** — exist nowhere in the tree as programs. Each carries a `stage:` asserting progress ("Commercial delivery", "Capability buildout", "Research acceleration", "Network design", "Mission planning"), rendered to visitors by `ProjectCarousel`. Meanwhile every project actually built since April is absent.
  2. `careerFocusRoles` and the "Current focus" spotlight advertise six **near-term searches**, three of them — Robotics Systems Lead, Computational Life Systems Lead, Expedition Operations Director — into divisions with empty rosters, under the line "The public pipeline is intentionally curated."
  3. The careers hero states "FrostAura hires leaders, principal engineers, senior researchers…" in the present tense, of a one-person company.
  4. The investor thesis block asserts "Software-led revenue creates the first engine" as an accomplished fact; nothing in the portfolio earns yet.

  The 2026-07-30 edit removed one retired entry and stopped there, which shows the file is maintained reactively, one dead line at a time. **Fixing only `projectContent` leaves the other three saying the same thing.** This is a **parent-controlled brand concern** — the copy is a public claim about what the holding company is building — so it is recorded here and not edited. The durable fix is one ruling that covers all four: is this surface *the registry rendered* or *deliberate positioning*, and say which in the file itself. Owner: Dean.
- **The claimed higher bar is not in the gates.** `CLAUDE.md` holds copy, visuals and accessibility here to a higher standard than internal tooling. What exists (re-verified 2026-09-16): two frontend unit tests, three e2e tests, a backend suite reaching the submission endpoints and the email-settings binding — and no axe, no Lighthouse, no design system, an empty `public/`. The gap is not that CI is absent; it is that nothing in it tests anything the "higher bar" is about. Either raise the gates or drop the claim — a stated standard nothing enforces is worse than an honest silence.
- **Nobody has checked the site against its own visual target.** `docs/references/FrostAura_Public_Landing_Page.html` is the stated reference and nothing records how close the built site is to it. It is a chore, not a decision — cheap to answer by opening both, and it stays undone.
- Two undeclared deviations from division convention sit on this repo — the layout and the doc taxonomy — and nothing here records a reason for either. Both are held one level up, with the other repos they affect: [`../../../memory/gotchas.md`](../../../memory/gotchas.md) and [`../../../memory/watch.md`](../../../memory/watch.md).
- Zero engineering activity since 2026-04-06 on a live public brand surface.
