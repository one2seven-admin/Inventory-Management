function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export const config = {
  port: Number(process.env.REPORTING_PORT ?? 8006),
  inventoryServiceUrl: requireEnv("INVENTORY_SERVICE_URL"),
  purchasingServiceUrl: requireEnv("PURCHASING_SERVICE_URL"),
  recipesServiceUrl: requireEnv("RECIPES_SERVICE_URL"),
};
