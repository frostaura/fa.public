# AGENTS.md — FrostAura Public

This file is a **pointer**, not a source of truth. It exists so tools that look for `AGENTS.md` rather than `CLAUDE.md` still land on the right context.

**Read [`CLAUDE.md`](CLAUDE.md) in this directory. It is canonical.** Then read [`MEMORY.md`](MEMORY.md) beside it, and the `CLAUDE.md` + `MEMORY.md` pair at every level above this one.

## Where the operating model lives

The agent operating model — role boundaries, task and proof discipline, gates, the end-of-session routine, the repository-durability check — **ships in the installed Gaia plugins**. It is not a file in this repository, and it is not restated here.

This file previously held a vendored copy of that constitution. The copy was removed on 2026-08-21: a generic procedure forked into one repository is a snapshot that stops receiving fixes, and three such generations had already drifted apart across this division's repos. A stale procedure that no longer matches reality is fixed **upstream and reinstalled**, never forked back in here.

- Repo-specific rules, conventions, build commands and the *Never do here* list: [`CLAUDE.md`](CLAUDE.md)
- Current state, the declared stack deviations and known traps: [`MEMORY.md`](MEMORY.md)

**One repo-specific warning worth repeating here**, because it is the thing an agent landing on this file is most likely to get wrong: this is the brand's front door. Copy, visuals and accessibility carry a higher bar than internal tooling, and brand decisions made here are **parent-controlled**, not division-controlled. Read `CLAUDE.md` before editing any user-visible text.

Where anything here and `CLAUDE.md` appear to conflict, `CLAUDE.md` wins.
