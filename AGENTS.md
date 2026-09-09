<!-- intent-skills:start -->
## Skill Loading

Before editing files for a substantial task:
- Run `npx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `npx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

# Project context

## Agent rules
Agent-facing rules (stack constraints, safe/unsafe edit surfaces, secrets policy, workflow expectations) live in [.cursor/rules/preishare.mdc](.cursor/rules/preishare.mdc). This file is the human-readable companion — keep both in sync when either changes.

## What PREIshare is
PREIshare is a real-estate intelligence product: it takes real-estate data from many sources — property details, market trends, sales — to help people make informed buying/selling decisions (per `docs/onboarding/team-orientation-notes.md` §1). It is a single package, not a monorepo (`docs/onboarding/repo-map.md` §1).

## Onboarding docs
- [docs/onboarding/repo-map.md](docs/onboarding/repo-map.md) — verified inventory of the repo, plus safe-first-touch vs. do-not-edit-yet lists
- [docs/onboarding/setup-log.md](docs/onboarding/setup-log.md) — fork/clone/remote setup record
- [docs/onboarding/team-orientation-notes.md](docs/onboarding/team-orientation-notes.md) — product mission and PR-workflow expectations

## Scaffold commands

Exact CLI used (initially created a nested folder, then merged into this repo root):

```bash
npx @tanstack/cli@latest create my-tanstack-app --agent --package-manager npm --tailwind
```

Notes from CLI:
- `--tailwind` is deprecated/ignored; Tailwind is already enabled in the standard TanStack Start scaffold.
- No partner add-ons were selected (`chosenAddOns: []`). Blank React Start starter only.

Follow-up Intent commands (run from this repo root):

```bash
npx @tanstack/intent@latest install
npx @tanstack/intent@latest list
```

Result: 9 intent-enabled packages, 31 skills (Start, Router, Devtools, Virtual File Routes).

## Chosen stack

| Choice | Value |
|--------|--------|
| Framework | React 19 + TanStack Start |
| Starter | Blank / default file-router preset |
| Package manager | npm |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Toolchain | Vite 8 + TypeScript (default CLI toolchain) |
| Router | TanStack Router file-based routes (`src/routes`) |
| Path aliases | `#/*` and `@/*` both → `src/*` (see `tsconfig.json`) |
| Integrations / add-ons | None |
| Backend/data (planned, not yet present) | Supabase, PostgreSQL, pgvector — no `supabase/` folder, client file, or SQL/migrations exist yet; confirm with a human before treating as implemented (see `docs/onboarding/repo-map.md` §4) |

## Layout (preserve unless there is a clear reason to change)

- `src/routes/` — file routes (`__root.tsx`, `index.tsx`, `about.tsx`)
- `src/router.tsx` — router factory
- `src/components/` — Header, Footer, ThemeToggle
- `src/styles.css` — Tailwind entry
- `vite.config.ts` — `devtools()`, `tailwindcss()`, `tanstackStart()`, `viteReact()`
- `tsr.config.json` — route generation config
- `.cta.json` — scaffold metadata

Package name in `package.json` is `preishare-org-repo` (repo root). App lives at the repository root, not under `my-tanstack-app/`.

## Safety boundaries (restated from `.cursor/rules/preishare.mdc` — keep both in sync)

- **Safe first surfaces:** `docs/`, `README.md`, small clearly scoped UI copy already identified as safe — see `docs/onboarding/repo-map.md` §6 for the current, verified list. Don't invent paths not listed there.
- **Avoid unless explicitly tasked:** auth, billing, database migrations, CI secrets, large dependency upgrades, and any do-not-edit-yet config/build files (`package.json`, `tsconfig.json`, `tsr.config.json`, `vite.config.ts`, `.vscode/settings.json`, `.cursor/rules/preishare.mdc`, this file).
- **Secrets:** never commit `.env`, API keys, tokens, or connection strings (`.env` is gitignored). Never print secrets into docs, rules, or chat logs. Document configuration by variable *name* only (e.g. `SUPABASE_URL`), never a real value.
- **Diffs:** prefer the smallest diff that completes the task; no drive-by refactors; no new libraries without explicit human sign-off.

## Environment variables

None required for the blank scaffold.

When adding secrets or config later (from `@tanstack/start-client-core#start-core/execution-model`):
- **Server-only:** read `process.env.MY_SECRET` inside handlers / `createServerFn` / per-request code — never at module scope, never with a `VITE_` prefix.
- **Client-exposed:** only `VITE_*` via `import.meta.env.VITE_*`.
- Do not put secrets in `VITE_*` variables (they ship in the client bundle).
- `.env` is gitignored.

## Scripts

```bash
npm install
npm run dev      # Vite on port 3000
npm run build
npm run preview
npm run generate-routes
```

No `test` script is defined yet (open question logged in `docs/onboarding/repo-map.md` §7).

## Contribution workflow (PR)

Per `docs/onboarding/team-orientation-notes.md` §0/§4 and `docs/onboarding/setup-log.md`:
- Contribute by forking the repo and opening pull requests from the fork — never push directly to the team repo's default branch.
- Work on a small, scoped feature branch; describe why the change exists and how a reviewer can verify it.
- Treat failing automated checks as blockers once CI exists (none is configured yet — see `docs/onboarding/repo-map.md` §5).

## Deployment notes

Blank scaffold has no host-specific adapter yet. TanStack Start deploys via Vite + Nitro (see `npx @tanstack/intent@latest load @tanstack/start-client-core#start-core/deployment`). Typical next step for Vercel/Node/Railway is adding the Nitro Vite plugin when you are ready to deploy.

## Architectural decisions

- Keep the generated structure; prefer Intent skills over guessing Start/Router APIs.
- Isomorphic-by-default: use `createServerFn` / `createServerOnlyFn` / `createClientOnlyFn` for environment boundaries.
- No auth, DB, or partner integrations in this blank app.

## Known gotchas

- CLI `--tailwind` flag is ignored (Tailwind is on by default).
- Nested `my-tanstack-app/` from the create command was flattened into this repo root on purpose.
- `intent install` keeps a short skill-loading block at the top of this file; durable project notes live below it.
- Future Intent versions may require an explicit `intent.skills` allowlist.

## Next steps

1. `npm run dev` and open http://localhost:3000
2. Add routes under `src/routes/` as needed
3. Load matching Intent skills before Start/Router/Devtools changes
4. When deploying, load the deployment skill and add the appropriate Nitro/host preset
5. Add `.env` / typed env declarations only when real config is introduced
