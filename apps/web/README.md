# web

Next.js 16 (App Router) frontend/BFF — PRD §2.4 Web Application.

Server Components fetch data directly from the gateway on every request (no caching layer yet); mutations go through Server Actions, which also call the gateway. The session is a short-lived JWT (from identity-service) stored in an httpOnly cookie — never exposed to the browser. `src/proxy.ts` (Next 16's replacement for `middleware.ts`) redirects any request without a session cookie to `/login`; RBAC-specific page access (e.g. `/users`) is enforced again inside the page itself via `roleHasCapability`.

## Run

```bash
Uses the root `.env` (`cp .env.example .env` at the repo root) — no per-service .env file.

```bash
npm run build:shared   # compiles packages/contracts + packages/http-client — required before first run,
                        # and again any time either package's source changes (see note below)
npm run dev -w apps/web   # http://localhost:3000
```

Needs the gateway (and whichever services it proxies to) running to actually load data — see the root README.

## Why packages/contracts and packages/http-client are pre-built

They're consumed as compiled packages (`package.json` `main`/`types` point at `dist/`, not `src/`) rather than raw TypeScript, because Next.js's Turbopack cannot resolve the NodeNext-style `.js`-mapped-to-`.ts` relative imports used inside those packages (a real, reproducible bundling failure — `transpilePackages` alone does not fix it). If you change anything in either package, rerun `npm run build:shared` from the repo root before the web app will see it. The root `predev`/`predev:core` scripts do this automatically for `npm run dev`.

## Structure

- `src/proxy.ts` — session-cookie gate (Next's `proxy` file convention, née `middleware.ts`)
- `src/lib/session/` — cookie read/write helpers + `getCurrentUser()` (calls `GET /identity/auth/me` through the gateway, deduped per request via React `cache()`)
- `src/lib/api/` — typed gateway HTTP client
- `src/actions/` — Server Actions, one file per mutation, grouped by feature
- `src/app/(dashboard)/` — authenticated route group (login-gated layout renders `AppShell` with role-aware nav)
- `src/components/` — one component per file, grouped by feature to match `src/actions/`
