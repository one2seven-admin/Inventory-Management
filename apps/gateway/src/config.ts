function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export const config = {
  port: Number(process.env.PORT ?? 4000),
  jwtAccessSecret: requireEnv("JWT_ACCESS_SECRET"),
  services: {
    identity: requireEnv("IDENTITY_SERVICE_URL"),
    inventory: requireEnv("INVENTORY_SERVICE_URL"),
    purchasing: requireEnv("PURCHASING_SERVICE_URL"),
    recipes: requireEnv("RECIPES_SERVICE_URL"),
    notifications: requireEnv("NOTIFICATIONS_SERVICE_URL"),
    reporting: requireEnv("REPORTING_SERVICE_URL"),
  },
};

export type ServiceName = keyof typeof config.services;
