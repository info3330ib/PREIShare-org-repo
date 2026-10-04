/**
 * App configuration entry point.
 *
 * Older TanStack Start versions (the `vinxi` era) read their config from this file
 * via `@tanstack/react-start/config`. This project runs a current version
 * (1.168+) where that module no longer exists and the build is configured in
 * `vite.config.ts` instead (TanStack Start, React, Tailwind, and Nitro plugins).
 *
 * To keep a single source of truth, this file re-exports that config rather than
 * defining a second one. Edit `vite.config.ts`, not this file.
 */
export { default } from './vite.config'
