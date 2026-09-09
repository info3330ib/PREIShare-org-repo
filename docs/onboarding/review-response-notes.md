# Review response notes — first PREIshare PR

## PR under review
- Branch name: docs/first-contribution-info3330ib
- PR title (after any edits): docs: add CONTRIBUTORS.md entry for onboarding (title unchanged, body edited)
- Link or local identifier: https://github.com/EdTechForLearning/PREIShare-org-repo/pull/12
- Related files: CONTRIBUTORS.md, docs/onboarding/pr-description.md, docs/onboarding/first-contribution-notes.md, docs/onboarding/first-contribution-plan.md

## Simulated reviewer setup
- Tool used (chat-assistant / coding-agent): coding-agent, acting as a PREIshare mentor reviewer
- What context I pasted for the reviewer: the live pr-description.md content, the CONTRIBUTORS.md content, and first-contribution-notes.md, all already open in the same session
- Date of simulation: 2026-09-09

## Feedback received

### Comment 1
- **Theme:** scope
- **Blocking?** yes
- **Reviewer said:** Files changed shows four new files (CONTRIBUTORS.md, first-contribution-plan.md, first-contribution-notes.md, pr-description.md), but the PR title and the "What reviewers should look at" checklist only named CONTRIBUTORS.md. Update the description so it honestly lists everything in the diff.
- **My decision:** accept-now
- **Why:** a reviewer following the checklist would only check one file and miss three others sitting in the same diff. Cheap to fix, no reason to leave it misleading.
- **Action taken:** edit PR description
- **Evidence:** "What reviewers should look at" in pr-description.md now lists all four files by path.

### Comment 2
- **Theme:** PR clarity
- **Blocking?** no
- **Reviewer said:** The Test plan only covers CONTRIBUTORS.md. The other three files in the diff have no corresponding verification steps.
- **My decision:** accept-now
- **Why:** cheap addition, bundled naturally with the Comment 1 edit.
- **Action taken:** edit PR description
- **Evidence:** Test plan step 4 now says "Skim first-contribution-plan.md and first-contribution-notes.md: confirm they render as valid Markdown and match what this description claims."

### Comment 3
- **Theme:** verification
- **Blocking?** no
- **Reviewer said:** The Test plan describes what a reviewer could do, not what the author actually did and found. Record real evidence, not just hypothetical steps.
- **My decision:** accept-now
- **Why:** the PR description itself should stay instructions-for-a-reviewer, not a log of my own actions, so the evidence belongs here instead.
- **Action taken:** none to pr-description.md; ran the actual checks and recorded results below in Re-verification checklist
- **Evidence:** see Re-verification checklist section, includes real grep output, not a claim.

### Comment 4
- **Theme:** commits
- **Blocking?** no
- **Reviewer said:** History has an edit-then-revert pair (2cc5556 then b9e7be3) on first-contribution-plan.md with no explanation in the PR text.
- **My decision:** accept-now
- **Why:** one sentence removes a legitimate point of confusion for anyone reading git log next to the PR.
- **Action taken:** edit PR description
- **Evidence:** Approach section now reads: "History includes one edit-then-revert pair on first-contribution-plan.md: a checkbox-only edit was made, then reverted once we agreed it fell outside the plan's approved scope."

(Only 4 comments were raised this round, themes required by the exercise, scope, clarity, verification, commit hygiene, are all covered.)

## Follow-up commits (if any)
| Commit message | Files touched | Addresses which comment # |
| --- | --- | --- |
| (pending) Fix PR description to list all four diffed files and explain the revert | docs/onboarding/pr-description.md | 1, 2, 4 |

Comment 3 needed no file change, it was resolved by actually running the verification (see below) rather than editing tracked files again.

## PR description edits (if any)
- Sections changed: Approach (added revert explanation), What reviewers should look at (added 3 missing files), Test plan (added a step covering the plan/notes files)
- Before -> after: checklist went from naming 1 file to naming all 4; Approach went from 3 bullets to 4, the new one explaining the edit-then-revert history
- Why the edit helps a reviewer: the description now matches the real Files changed tab instead of undercounting it, and the revert in git log is no longer unexplained

## Re-verification checklist
- [X] Still on the same feature branch (not main) — confirmed via `git branch --show-current`: docs/first-contribution-info3330ib
- [ ] Latest commits pushed; PR shows updated head — NOT yet done. The pr-description.md fix above is a local, uncommitted edit as of writing.
- [X] Diff includes only intended onboarding files — confirmed via `git diff main --stat`: exactly CONTRIBUTORS.md, first-contribution-plan.md, first-contribution-notes.md, pr-description.md, nothing else
- [X] No secrets, .env values, or machine-specific paths added — ran `grep -riE "api[_-]?key|secret|password|token|BEGIN.*PRIVATE KEY|protonmail|@gmail"` and a separate scan for `C:\Users`/`/home/`/`/Users/` across all four files. Only matches were policy sentences like "No secrets... are included", no real credentials or absolute paths found.
- [X] Manual or scripted checks claimed in the PR still pass — the scans above were run for real this session, not just claimed
- [X] Blocking comments all have a written resolution — Comment 1 was the only blocking item, resolved above
- [X] Non-blocking items either fixed or parked with a reason — Comments 2 and 4 fixed directly, Comment 3 resolved by running real verification instead of editing the PR text again

## Merge-readiness statement
Content-wise this is ready: the diff is small, docs-only, matches what the (now-corrected) PR description claims, and no secrets or machine paths are present. What is not yet done is mechanical: the pr-description.md fix above still needs to be committed and pushed so the live PR actually shows the corrected text, right now GitHub still shows the old, narrower checklist. A human mentor should double-check whether documentation-process files like this notes file and pr-description.md really belong bundled into a "CONTRIBUTORS.md entry" PR at all, versus being split into a separate, explicitly-scoped PR, since that scope question keeps recurring and hasn't been settled once and for all.

## What I learned about review culture
- One habit I will keep: checking whether a PR's description text actually matches the real Files changed list before calling something "done", not just trusting the summary I wrote earlier.
- One mistake I will avoid next time: letting documentation-about-the-process (like this file, or pr-description.md) expand a PR's scope without explicitly deciding, each time, whether it belongs in the same PR as the actual deliverable.
