# PREIshare setup log

**Learner:** <Isaac Bown>
**Date:** <2026-09-04>
**OS:** <Windows>
**Team repo (upstream):** https://github.com/EdTechForLearning/PREIShare-org-repo
**Orientation notes used:** `docs/onboarding/team-orientation-notes.md`

## 1. Accounts and fork

| Check | Result | Notes |
| --- | --- | --- |
| GitHub sign-in works | PASS | Account username: @info3330ib |
| Can view team repo https://github.com/EdTechForLearning/PREIShare-org-repo | PASS | |
| Fork created in my account | PASS | My fork URL: https://github.com/info3330ib/PREIShare-org-repo |

## 2. Git install and identity

```text
# paste output of: git --version
PS C:\Users\Admin\source\repos\PREIShare-org-repo> git --version
git version 2.53.0.windows.2
# paste output of: git config --global user.name
# paste output of: git config --global user.email
# (email may be partially redacted in shared copies)
```
PS C:\Users\Admin> git config --global user.name "info3330ib"
PS C:\Users\Admin> git config --global user.email "info3330ib@protonmail.com"
PS C:\Users\Admin> git config --global --list
filter.lfs.clean=git-lfs clean -- %f
filter.lfs.smudge=git-lfs smudge -- %f
filter.lfs.process=git-lfs filter-process
filter.lfs.required=true
user.name=info3330ib
user.email=info3330ib@protonmail.com

Identity configured: PASS

## 3. Clone (of MY fork)

- Parent directory used: `<C:\Users\Admin\source\repos>`
- Clone command used: `git clone https://github.com/<your-github-username>/PREIShare-org-repo.git`
- Cloned my fork (not the team repo): PASS
- Clone completed without error: PASS
- Local project path: `<C:\Users\Admin\source\repos\PREIShare-org-repo>`

## 4. Remotes (run inside the repo)

- `git remote add upstream https://github.com/EdTechForLearning/PREIShare-org-repo.git` run: PASS

### git remote -v

```text
# paste output — expect four lines:
# origin    https://github.com/<your-github-username>/PREIShare-org-repo.git (fetch)
# origin    https://github.com/<your-github-username>/PREIShare-org-repo.git (push)
# upstream  https://github.com/EdTechForLearning/PREIShare-org-repo.git (fetch)
# upstream  https://github.com/EdTechForLearning/PREIShare-org-repo.git (push)
```
PS C:\Users\Admin\source\repos\PREIShare-org-repo> git remote -v
origin  https://github.com/info3330ib/PREIShare-org-repo.git (fetch)
origin  https://github.com/info3330ib/PREIShare-org-repo.git (push)
upstream        https://github.com/EdTechForLearning/PREIShare-org-repo.git (fetch)
upstream        https://github.com/EdTechForLearning/PREIShare-org-repo.git (push)

origin points at MY fork: PASS
upstream points at the team repo: PASS

## 5. Post-clone verification

### git status

```text
# paste output — expect clean tree on default branch
```
PS C:\Users\Admin\source\repos\PREIShare-org-repo> git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
### Default branch

```text
# paste output of: git branch --show-current
# or: git branch
```
 git branch --show-current
main

Default branch name: `<main>`
Working tree clean after clone: PASS

## 6. Auth notes (no secrets)

- Clone method: HTTPS
- Auth method used (if prompted): none
- Auth succeeded: PASS
- **Do not paste tokens or private keys here**

## 7. Issues and fixes

| Issue | What I tried | Outcome |
| --- | --- | --- |
| <none or describe> | | |

Didn't clone into the original folder I intended, just rewrote my parent directory section...
## 8. Ready for next step

I have a fork I own, a local clone of it with origin and upstream set, and a setup log another teammate could audit: YES