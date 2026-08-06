export const config = {
  port: Number(process.env.PORT ?? 4005),
  // Server-to-server base URL for inventory-service, whose read endpoints
  // (below-par stock, expiring batches, items, locations) back the alert
  // detection functions in the alert-rules domain.
  inventoryServiceUrl: process.env.INVENTORY_SERVICE_URL ?? "http://localhost:4002",
};
