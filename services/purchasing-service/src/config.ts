export const config = {
  port: Number(process.env.PORT ?? 4003),
  inventoryServiceUrl: process.env.INVENTORY_SERVICE_URL ?? "http://localhost:4002",
};
