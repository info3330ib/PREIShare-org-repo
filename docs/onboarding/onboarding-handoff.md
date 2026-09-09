# PREIshare onboarding handoff

**Author:** Isaac Bown / info3330ib  
**Date:** 2026-09-09  
**Branch / PR:** docs/first-contribution-info3330ib — https://github.com/EdTechForLearning/PREIShare-org-repo/pull/12  
**Audience:** mentor, future self, sprint lead

## 1. Stakeholder summary (plain language)

I completed PREIshare engineering onboarding for Sprint 1 (dev environment and AI tooling). I forked the team repository, cloned my fork, wired up origin and upstream, verified my local toolchain, configured Cursor-style project rules and agent memory, mapped the repo to choose a safe first contribution, and opened a small cross-fork pull request that follows the team's Git and review habits. I also ran a simulated review cycle on that PR and verified the fixes against the real diff rather than trusting a polished-sounding draft.

**Definition of done met:**
- [X] Fork created, local clone of my fork, both remotes and toolchain verified (see setup log)
- [X] AI rules / project memory in place and smoke-tested
- [X] First contribution implemented and committed on a feature branch
- [X] PR opened and review feedback addressed (see review-response-notes.md)

## 2. Deliverables index (what exists and where)

| Artifact | Path | Why it matters |
| --- | --- | --- |
| Team orientation notes | docs/onboarding/team-orientation-notes.md | Mission, workflow, first-PR definition of done |
| Setup log | docs/onboarding/setup-log.md | Auditable proof of accounts, fork, Git identity, clone, remotes |
| Repo map | docs/onboarding/repo-map.md | Safe contribution surfaces (apps, packages, config) |
| AI tooling verification | docs/onboarding/ai-tooling-verification.md | Evidence agents respect PREIshare stack/conventions |
| Project rules | .cursor/rules/preishare.mdc | Persistent IDE-agent constraints |
| Agent memory entrypoint | AGENTS.md | Cross-tool project context for coding-agents |
| First contribution plan | docs/onboarding/first-contribution-plan.md | Scoped plan before code |
| Contribution notes | docs/onboarding/first-contribution-notes.md | What changed and why |
| Contributors credit | CONTRIBUTORS.md | Visible first contribution surface |
| PR description | docs/onboarding/pr-description.md | Reviewer-facing summary |
| Review response notes | docs/onboarding/review-response-notes.md | How feedback was handled |
| This handoff | docs/onboarding/onboarding-handoff.md | Single entry point for mentors |

## 3. Environment and toolchain snapshot

Copy only facts you verified in setup-log.md (do not invent versions):

- OS: Windows (per setup-log.md)
- Git user.name / user.email configured: yes (git 2.53.0.windows.2, verified via `git config --global --list`)
- Node / package manager versions: TODO — `node --version` / `npm --version` were never actually run this sprint. package.json declares React 19.2.0, Vite ^8.0.0, TypeScript ^6.0.2, Tailwind ^4.1.18, but those are package versions, not confirmed installed toolchain versions.
- origin (my fork) URL: https://github.com/info3330ib/PREIShare-org-repo.git
- upstream (team repo) URL: https://github.com/EdTechForLearning/PREIShare-org-repo.git
- Install/build/test commands run and result: TODO — `npm install`, `npm run dev`, and `npm run build` were never actually run this sprint. All work was reading, editing, and committing docs; the dev server was never started.
- Blockers hit and how resolved: two onboarding scaffold files had unrelated templates pasted into one file (`CONTRIBUTORS.md` originally also contained the `first-contribution-notes.md` scaffold); split them apart before filling in either. A checkbox-only edit to `first-contribution-plan.md` was made and pushed, then reverted with `git revert` once we agreed it fell outside the plan's approved scope. A simulated PR review caught that the PR description undercounted the diffed files (named 1 of 4); fixed by updating the description to match the real `Files changed` list.

## 4. AI tooling posture

- Rules file purpose (one sentence): agent-facing rules constraining stack assumptions, safe vs. do-not-edit-yet surfaces, secrets policy, and small-diff workflow expectations.
- AGENTS.md purpose (one sentence): human-readable companion to the rules file, pointing at onboarding docs and restating the same stack and safety boundaries so the two can't silently drift.
- Smoke-test prompt used and whether the agent correctly named stack pieces: 4 prompts covering routes/entry/packages-vs-apps, secret handling, first-change scoping, and stack + config locations. All 4 passed. On the stack question specifically, the agent correctly named TypeScript, React 19, TanStack Start/Router, Vite, Tailwind, npm with real config paths, and correctly flagged Supabase/PostgreSQL/pgvector as planned but not present in the repo rather than claiming them as already implemented.
- Context gaps found and fixes applied: before the smoke tests, `.cursor/rules/preishare.mdc` had called the repo "this monorepo" (repo-map.md found single package, not monorepo) and listed Supabase/PostgreSQL/pgvector as current stack without noting nothing was implemented yet. Both were corrected in `preishare.mdc` and mirrored into `AGENTS.md` before the smoke tests ran; see docs/onboarding/ai-tooling-verification.md for the recorded GO decision.

## 5. First contribution and review outcome

- Plan goal (from first-contribution-plan.md): add myself to CONTRIBUTORS.md as one minimal, reviewable, beginner-safe change, explicitly declining an optional second touch to keep the first PR to one file.
- Files touched: CONTRIBUTORS.md (the deliverable), plus docs/onboarding/first-contribution-plan.md, first-contribution-notes.md, and pr-description.md, all docs-only, confirmed via `git diff main --stat` with no app/config files present.
- PR title and link: "docs: add CONTRIBUTORS.md entry for onboarding" — https://github.com/EdTechForLearning/PREIShare-org-repo/pull/12
- Review-style feedback received (summary): 4 simulated mentor comments covering scope, PR clarity, verification evidence, and commit hygiene. One was blocking (the PR description named only 1 of the 4 diffed files); see review-response-notes.md for full detail.
- Changes made in response: expanded the "What reviewers should look at" checklist and Test plan to cover all four files, added a sentence explaining the edit-then-revert commit pair, and ran real secret/absolute-path scans instead of just listing them as hypothetical steps.
- Merge readiness: ready with follow-ups — content and diff scope are verified clean, but the PR is still awaiting an actual human mentor review, not a self-certified pass.

## 6. Open risks and environment gaps

List anything a mentor should know before assigning feature work:

1. No automated safety net: no `test` script exists in package.json, and no CI (`.github/workflows/`) is configured. Everything verified this sprint, including this PR, was manual/eyeball checks only, nothing was machine-checked. This is the gap most likely to bite the next contributor doing real feature work.
2. Supabase/PostgreSQL/pgvector remain planned, not present: no client file, no env vars, no migrations exist in the repo. Any feature work touching data needs that groundwork first.
3. PR #12 is content-ready per our own re-verification but has not yet had an actual human mentor review.

Day-one re-verify for next sprint: confirm whether a test script and CI have been added since this handoff; if not, that should probably be prioritized before feature work starts, not treated as onboarding's problem to solve.

## 7. Decisions log (for stakeholders)

| Decision | Choice | Rationale |
| --- | --- | --- |
| First contribution surface | CONTRIBUTORS.md | Low risk, visible, matches onboarding plan |
| Branch naming | docs/first-contribution-info3330ib | Matches team feature-branch habit from orientation notes |
| AI tool category used most | coding-agent (Claude Code) | Used throughout for drafting, self-review, and simulated mentor feedback, always checked against real repo facts, not trusted blindly |
| Checkbox-edit scope decision | Reverted the plan-file checkbox commit rather than keeping it | It touched a file outside the plan's declared "no other path approved" scope, so it didn't belong in this PR |

## 8. Next-sprint preview (what this unlocks)

The next sprint topic can assume:

1. **Trusted local environment** — clone + toolchain documented in setup-log.md; re-run only if OS or versions change.
2. **AI alignment** — .cursor/rules/preishare.mdc and AGENTS.md exist; extend rules when new packages appear, do not start from zero.
3. **Git habit** — feature branch → small commits → PR → respond to review is practiced once end-to-end.
4. **First PR path** — merge-ready or merged onboarding contribution; feature work should use the same PR quality bar.

**Explicitly out of scope until later:** large product features, production deployments, and database migrations you have not been trained on yet.

**Not yet true, don't assume it:** there is no automated safety net (no test script, no CI). Feature work in the next sprint will be verified manually the same way this onboarding sprint was, unless that gap is closed first.

## 9. Ask for mentor

- Questions still open: (1) Should CI and a test script be added before any feature work is assigned, given no automated safety net exists today? (2) Do process/portfolio docs like pr-description.md and review-response-notes.md belong bundled into a small onboarding PR, or should they be split into a separate, explicitly-scoped PR going forward? This kept recurring during review and was never settled once and for all.
- Review of this handoff requested: yes
- Preferred follow-up time or channel: TODO — I have not decided this yet, fill in before sending to a mentor.

---

*End of handoff. Keep this file updated if merge status or env gaps change before the next sprint starts.*