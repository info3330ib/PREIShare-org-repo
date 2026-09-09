# Vercel Hobby setup — PREIshare investor app

**Date:** 2026-09-09
**Vercel plan:** Hobby (free) — not Pro

## URLs (the same ones you will reuse all semester)

| Item | Value |
| --- | --- |
| GitHub repository (you can push) | `https://github.com/info3330ib/PREIShare-org-repo/` |
| Instructor collaborator | `thortek` added: yes|
| Vercel Production URL | `https://prei-share-org-repo-self.vercel.app/` |
| Preview URLs | Do **not** submit these to Canvas: `prei-share-org-repo-4ygveaayd-info3330ib-1337.vercel.app` |

## Hobby constraints I will keep

- One Vercel project for this course
- Production deploys from `main` only
- No cron / Fluid Compute / paid add-ons
- Secrets go in the Vercel dashboard later — never in git

## First production deploy

- Status: Ready — deployed after the Nitro Vite plugin fix landed on `main` (commit 9a6d4a3), which was needed because the build succeeds without Nitro but Vercel then serves 404 NOT_FOUND on every route.
- Incognito check of Production URL: pass — checked fetch of `https://prei-share-org-repo-self.vercel.app/`, which returned the real TanStack Start homepage (nav, headings, feature sections), not a 404 or the Vercel dashboard. This was not a manual browser incognito check; do a real incognito-window check yourself too before treating this as fully confirmed.