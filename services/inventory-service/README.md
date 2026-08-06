# inventory-service

Item master, locations, the stock ledger (receive/issue/adjust/transfer/count), batch & expiry tracking, and wastage logging — PRD §3.1, §3.5, §3.8–§3.11.

## Run

```bash
cp .env.example .env
npm run db:generate -w services/inventory-service
npm run db:push -w services/inventory-service
npm run db:seed -w services/inventory-service   # Main Branch location + a few sample items
npm run dev -w services/inventory-service        # http://localhost:4002
```

## Notes

- Shares the platform's one Postgres database, isolated in its own `inventory` schema via `?schema=inventory` on `DATABASE_URL` — no cross-service DB access, only HTTP.
- On-hand stock is tracked per **item + location** (not per storage sub-area); storage area is recorded as descriptive metadata on individual ledger transactions.
- Valuation uses **weighted-average cost** only for MVP (`Item.averageCost`, rolled forward on every `RECEIVE`). FIFO is defined in the shared contracts but not implemented — a P1 upgrade.
- Perishable items are drawn down **FEFO** (earliest expiry first) automatically on `ISSUE`/`WASTAGE`, satisfying batch traceability without the P1 "block non-FEFO picks" enforcement UI.
- `POST /stock/receive`, `/issue`, `/adjust`, `/stock/counts`, wastage, and transfer dispatch/receive all funnel through one internal helper (`postStockTransaction`) so the running balance and the immutable ledger can never drift apart.
