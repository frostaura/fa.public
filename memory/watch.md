---
name: fa-public-watch
description: "Live site still advertises the killed Life OS and Startup, plus phantom programmes, searches into empty divisions, present-tense hiring and revenue as fact; no gate tests the brand bar; vendored residue incl. a dead mcp.json"
type: watch
last_verified: 2026-11-20
---

# Watch list

- **The site asserts as fact what the tree does not support, on four surfaces.** Re-verified 2026-11-20 against `src/web/src/content/siteContent.ts`:
  1. `projectContent` holds seven entries rendered by `ProjectCarousel`, and **none of them is a living project**. The two that were real, Life OS (`stage: 'Active build'`) and FrostAura Startup (`'Internal systems mode'`), were killed on 2026-11-20 and are still advertised on the live site. So is the Technologies division card (`projects: ['Life OS', 'FrostAura Startup', …]`, line 101). The other five entries, **Enterprise AI Systems**, **Robotics and Autonomy**, **Protein Folding AI**, **Underwater Network** and **Marine Archaeology Missions**, exist nowhere in the tree, yet each carries a progress `stage:`. Both living Technologies products are absent. Removing Life OS breaks the first e2e test, which asserts a "Life OS" heading (`tests/e2e/public-site.spec.ts:14`). Copy and test have to change in one commit.
  2. `careerFocusRoles` and the "Current focus" spotlight advertise six **near-term searches**, three — Robotics Systems Lead, Computational Life Systems Lead, Expedition Operations Director — into divisions whose `projects/` hold no programme, under "The public pipeline is intentionally curated."
  3. The careers hero says "FrostAura hires leaders, principal engineers, senior researchers…" in the present tense, of a one-person company.
  4. The system block states "Software-led revenue creates the first engine" as accomplished fact; nothing in the portfolio earns.

  The only edit since April removed one retired entry and stopped. **Fixing `projectContent` alone leaves the other three saying the same thing.** This is a parent-controlled brand concern, so it is recorded, not edited. The durable fix is one ruling: is this surface *the registry rendered* or *deliberate positioning* — and say which in the file. Owner: Dean.
- **The claimed higher bar is in no gate.** `CLAUDE.md` holds copy, visuals and accessibility to a higher standard; nothing in CI tests any of the three — no axe, no Lighthouse, no visual check, no design system. Raise the gates or drop the claim.
- **Vendored-era residue survives the 2026-08-21 removal** (re-verified 2026-11-20): the tracked `.vscode/mcp.json` declares a `gaia-workflows` stdio server at `.github/mcp-workflows/src/Gaia.Workflows.Server`, a path that no longer exists — a dead pointer in a public repo, editor tooling only; `.gitignore` is a copied Gaia-toolkit template (header plus `.github/state/Gaia.*.db.json` lines); the disk-only `.dockerignore` still names `.github/mcp` and `.copilot`. One cleanup commit clears all three.
- **Two departures from division convention carry no recorded decision, why or owner** (re-verified 2026-11-20): the frontend lives in `src/web/`, not `src/frontend/`, and `docs/architecture/` holds three unnumbered files instead of the numbered taxonomy, with no `docs/testing/`. Since the 2026-11-20 kills no living repo follows the taxonomy, which makes it a division question ([`../../../memory/questions.md`](../../../memory/questions.md)).
