# PREIshare repository map

> Onboarding map for first contribution planning. Built with AI-assisted
> inventory + human path verification. Do not treat this as architecture law
> if the real tree disagrees—update this file when you learn more.

## Meta

- Clone path (from setup-log): `<C:\Users\Admin\source\repos\PREIShare-org-repo>`
- Date mapped: `<2026-09-04>`
- Agent tool used: `<Claude code | chat-assistant + manual listing>`
- Mapper: `<info3330ib>`

## 1. Overview (5–8 sentences)

PREIshare appears to be organized as: `<single package>`.
In plain language, the product code seems to live mainly in `<src/>`.
Shared libraries or packages appear in `<"none found">`.
Docs and onboarding notes live in `docs/` (including this file).
I am intentionally not editing application code while building this map.

## 2. Top-level inventory

| Path | Kind (app / package / config / docs / other) | One-sentence purpose | Verified by me? (yes/no) |
|------|-----------------------------------------------|----------------------|---------------------------|
| `<.cta.json>` | config | scaffolding tool metadata | yes |
| `<.cursorrules>` | config | Cursor AI coding rules | yes |
| `<.git/>` | other | git internal data | yes |
| `<.gitignore>` | config | Patterns git shouldn't track | yes |
| `<.vscode/>` | config | vs code workspace settings | yes |
| `<AGENTS.md>` | docs | context for AI coding agents | yes |
| `<README.md>` | docs | project overview for humans | yes |
| `docs/` | docs | Onboarding and project documentation | yes |
| `package.json` | config | Root package manifest / scripts | yes |
| `package-lock.json` | config | Locked dependency versions | yes |
| `<src/>` | app | app source code | yes |
| `<tsconfig.json>` | config | typescript compiler config | yes |
| `<tsr.config.json>` | config | tanstack router cli config | yes |
| `<vite.config.ts>` | config | Vite build and dev server config | yes |

<!-- Add every top-level name you actually see. Delete example rows you do not have. -->

## 3. Frontend concerns (TypeScript, React, TanStack Start)

- Likely app root(s): `<src/>`
- Clues I used (file names, frameworks mentioned in package.json): `<react/tailwindcss in package.json, vite.config.ts registers tanstackStart() plugin>`
- Entry / routes / UI areas worth knowing: `<src/router.tsx, src/routeTree.gen.ts, src/routes/__root.tsx, src/routes/index.tsx, src/routes/about.tsx, src/components/Header.tsx, Footer.tsx, ThemeToggle.tsx, src/styles.css>`
- How this area relates to user-facing screens: `<each url resolves to a file in src/routes/ rendered in src/routes/__root.tsx>`

## 4. Backend / data concerns (Supabase, PostgreSQL, pgvector, APIs)

- Supabase or data config paths: `<"not found yet">`
- Migrations / SQL / schema-related paths: `<"not found yet">`
- Env examples (NOT secret values): `<not found>`
- Notes on what a beginner should not touch in production data: `<Once supabase and migrations/env get added consider .env and migration files off limits.>`

## 5. Tooling and CI

- TypeScript / lint / format config: `<tsconfig.json, tsr.config.json>`
- CI workflows (e.g. GitHub Actions): `<.github/workflows/>`
- Editor or agent config already present: `<.vscode/settings.json, .cursorrules, AGENTS.md, .cta.json>`
- Scripts from package manifests that look like dev/build/test: `<dev, generate-routes, build, preview>`

## 6. Safe first-touch vs do-not-edit-yet

### Safe first-touch (good candidates for a tiny onboarding PR)

| Path or area | Why it is relatively safe | Risk if handled carelessly |
|--------------|---------------------------|----------------------------|
| `docs/onboarding/` | Docs-only; helps the team | Misleading docs |
| `<e.g. CONTRIBUTORS or similar if present>` | Low runtime impact | Wrong links / formatting |
| `<README.md>` | Docs-only, low impact | Wrong links or formatting |
| `<src/routes/about.tsx>` | easy preview | Broken page if jsx malformed |
### Do not edit yet (wait until you have tests, review, and a real task)

| Path or area | Why wait | What could break |
|--------------|----------|------------------|
| CI under `.github/` or equivalent | Shared pipeline | Everyone’s builds |
| Root workspace / package manager lockfiles | Dependency graph | Install failures for all |
| package.json, package-lock.json | Dependency graph | Install failures for all |
| tsconfig.json, tsr.config.json, vite.config.ts | Shared compiler/build/router config | Type errors, build or routing breakage |
| .vscode/settings.json, .cursorrules, AGENTS.md | Shared editor/agent tooling | Changes behavior for every contributor and agent session |
| Supabase / migrations / production env | Data and secrets | Data loss or leaked secrets |
| Shared packages used by multiple apps | Wide blast radius | Multiple features regress |
| Auth, payments, or vector/search core (if present) | High complexity | Security or relevance bugs |

## 7. Open questions for the team

- `<Something the agent could not verify, if supabase is planned but not implemented yet or removed>`
- `<Where official app entry is if multiple apps exist>`
- `<Which package is the source of truth for shared UI or types>`

## 8. How I will use this map next

- Configure AI project rules/memory using the paths above (next tooling steps).
- Pick a first contribution only from **Safe first-touch** unless a mentor expands scope.
- Revisit and edit this file when a path claim is proven wrong.