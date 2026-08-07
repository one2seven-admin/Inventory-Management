export const config = {
  port: Number(process.env.PURCHASING_PORT ?? 8003),
  inventoryServiceUrl: process.env.INVENTORY_SERVICE_URL ?? "http://localhost:4002",
};
