export const config = {
  port: Number(process.env.PORT ?? 4004),
  inventoryServiceUrl: process.env.INVENTORY_SERVICE_URL ?? "http://localhost:4002",
  posWebhookSecret: process.env.POS_WEBHOOK_SECRET ?? "dev-pos-secret-change-me",
};
