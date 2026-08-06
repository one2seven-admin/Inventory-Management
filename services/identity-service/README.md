# identity-service

Users, roles (RBAC per PRD §3.16/§6), and JWT authentication. Owns its own Postgres schema (`identity`) — no other service reads it directly.

## Run

```bash
cp .env.example .env
npm run db:generate -w services/identity-service
npm run db:push -w services/identity-service
npm run db:seed -w services/identity-service   # creates owner@restaurant.test / Owner123!
npm run dev -w services/identity-service        # http://localhost:4001
```

## Endpoints

- `POST /auth/login` — `{ email, password }` → access + refresh token
- `POST /auth/refresh` — `{ refreshToken }` → rotates and returns a new pair
- `POST /auth/logout` — `{ refreshToken }` → revokes it
- `GET /auth/me` — requires `x-user-id`/`x-user-roles` headers (normally injected by the gateway)
- `GET/POST /users`, `PATCH /users/:id/roles`, `POST /users/:id/deactivate` — require the `MANAGE_USERS` capability (Owner role)

## Database

All services share one Postgres database, each isolated in its own schema namespace via `?schema=<service>` on `DATABASE_URL` (this service uses `identity`). No cross-service DB access — only HTTP.
