# gateway

The platform's single public entry point. Verifies the caller's JWT (issued by identity-service) and reverse-proxies to the matching backend service, replacing any client-supplied `x-user-*` headers with the ones derived from the verified token — so every downstream service can trust those headers unconditionally.

## Routing

`/api/v1/<service>/*` → that service's own root, e.g. `/api/v1/inventory/items` → `inventory-service:4002/items`.

Public (no JWT required): `POST /api/v1/identity/auth/login`, `/auth/refresh`, `/auth/logout`.

## Run

```bash
cp .env.example .env   # JWT_ACCESS_SECRET must match identity-service's
npm run dev -w apps/gateway   # http://localhost:4000
```
