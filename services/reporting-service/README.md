# reporting-service

Dashboard KPIs and reports — PRD §3.17. Stateless: no database of its own, purely an aggregator over inventory-service, purchasing-service, and recipes-service's read endpoints, fanned out in parallel per request.

## Run

Uses the root `.env` (`cp .env.example .env` at the repo root) — no per-service .env file.

```bash
npm run dev -w services/reporting-service   # http://localhost:8006
```

Needs inventory-service, purchasing-service, and recipes-service running to return anything meaningful.

## Endpoints

- `GET /dashboard?locationId=` — stock value, average food cost %, low-stock count, pending PO count, top 5 wastage items by cost
- `GET /reports/food-cost` — every active recipe's plate cost / selling price / food-cost %
- `GET /reports/spend?from=&to=&locationId=` — purchase spend grouped by supplier within the date range
- `GET /reports/stock-valuation?locationId=` — current inventory value by item

## Known simplifications (documented, not bugs)

- Food-cost reporting uses each recipe's **current** ingredient costs, not a historical point-in-time cost — the platform doesn't yet persist period-over-period sales revenue anywhere. Wiring `/reports/food-cost` to actual sales history (via recipes-service's sales-event log) is a natural P1 follow-up.
- Spend-by-supplier filters on `createdAt` client-side after fetching every PO for the location, since purchasing-service doesn't expose a date-range filter itself. Fine at MVP scale.
