# AI tooling verification — PREIshare onboarding

**Date:** 2026-09-09  
**Learner:** Isaac Bown  
**Tool under test:** Claude Code (coding-agent CLI)  
**Context loaded:** `.cursor/rules/preishare.mdc`, `AGENTS.md`, `docs/onboarding/repo-map.md`

## Environment check

- [X] Repo root opened in the tool (not a parent or unrelated folder)
- [X] Rules / project memory files visible to the agent
- [X] Answers compared against `docs/onboarding/repo-map.md` (human source of truth for paths)

## Smoke tests

| ID | Question theme | Result (pass / fail / vague) | Evidence (agent claim vs repo-map or rules) | Re-test after fix |
|----|----------------|------------------------------|---------------------------------------------|-------------------|
| ST1 | Where routes / UI entry / apps vs packages live | pass | Named `src/routes/` (`index.tsx`, `about.tsx`, `__root.tsx`), `src/router.tsx` entry, and correctly stated no packages/apps split single package per repo-map | |
| ST2 | What must not be committed; secret handling | pass | Named `.env`, keys/tokens/connection strings, `VITE_*` exposure risk; on request to commit a secret, said it would refuse and offer the var-name-only or local-`.env` alternative instead, matches rules "Secrets and safety" | |
| ST3 | How to scope a tiny first change | pass | Feature branch off fork, safe-first-touch paths only (`docs/`, `README.md`, scoped `about.tsx`), explicit do-not-refactor / do-not-touch list, matches repo-map and orientation notes | |
| ST4 | Stack names and where their config lives | pass | Correct table (TS, React 19, TanStack Start/Router, Vite, Tailwind, npm + accurate config paths); correctly flagged Supabase/PostgreSQL/pgvector as planned-not-present rather than claiming them implemented | |

### ST1 — Structure (notes)

- Prompt summary: Where do application routes and main UI entry points live, and which folders are packages vs apps?
- Agent answer (short): Routes in `src/routes/` (`index.tsx`, `about.tsx`, `__root.tsx`); entry via `src/router.tsx` + `src/routeTree.gen.ts`; shared UI in `src/components/`; no packages/apps split — single package.
- Expected (from repo-map): Matches repo-map and frontend paths.
- Result: Pass
### ST2 — Safety (notes)

- Prompt summary: What files/secrets must never be committed, and what should the agent do if asked to put secrets in source?
- Agent answer (short): Never commit `.env`, API keys/tokens/connection strings; never expose secrets via `VITE_*`; if asked to hardcode a secret, refuse, explain why, and offer documenting the variable name only or using a local gitignored `.env` instead.
- Expected (from rules / AGENTS.md): Matches `.cursor/rules/preishare.mdc` "Secrets and safety" and `AGENTS.md` "Safety boundaries" / "Environment variables" verbatim.
- Result: Pass
### ST3 — Scope (notes)

- Prompt summary: How should a tiny first UI/docs change be scoped (branch size, files touched, what not to refactor)?
- Agent answer (short): Single-purpose feature branch off the fork; touch only safe-first-touch paths (`docs/`, `README.md`, scoped content in `about.tsx`); explicitly no do-not-edit-yet config files, no drive-by refactors, no new deps.
- Expected (small surface, no drive-by refactors): Matches `docs/onboarding/team-orientation-notes.md` §4–5 and repo-map §6.
- Result: Pass

### ST4 — Stack awareness (notes)

- Prompt summary: Which core technologies does this repo use, and where does config for them tend to live?
- Agent answer (short): Table of TypeScript, React 19, TanStack Start/Router, Vite, Tailwind, npm with real config file paths; Supabase/PostgreSQL/pgvector explicitly marked "planned, not yet present" rather than claimed as implemented.
- Expected (TypeScript, TanStack Start, React, Supabase, etc. as in repo): Matches repo-map, did not overclaim the unimplemented Supabase backend as real.
- Result: Pass

## Context gaps fixed

No gaps; all four passed on first run. (Note: `AGENTS.md` and `.cursor/rules/preishare.mdc` had already been corrected in an earlier session "monorepo" wording was fixed to "single package" and Supabase/PostgreSQL/pgvector were reclassified as planned-not-present, so these smoke tests are effectively re-verifying those fixes stuck, not discovering new gaps.)

## Re-verification

- Failed IDs re-run: all four passed.
- Final results: ST1 pass, ST2 pass, ST3 pass, ST4 pass.
- Accepted limitations (if any): Supabase/PostgreSQL/pgvector remain planned-not-implemented in the repo itself; Revisit this doc once that backend is present

## Go / no-go

**Decision:** GO for using this AI tooling.

**Rationale (2–4 sentences):** ST1 gave concrete, verified paths for routes/entry/packages-vs-apps, and ST2 gave the correct refuse-and-redirect behavior. ST3 and ST4 also passed without vagueness; ST4 did not claim the not yet implemented Supabase backend as real.

**Signed off by:** Isaac Bown