import "dotenv/config";
import { prisma } from "./db/client.js";
import { hashPassword } from "./lib/hashPassword.js";

/**
 * Bootstraps the very first Owner account so someone can log in and create
 * everyone else via POST /users. Safe to re-run — it's a no-op if the
 * account already exists.
 */
async function main() {
  const email = "owner@restaurant.test";
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Seed skipped — ${email} already exists.`);
    return;
  }

  const passwordHash = await hashPassword("Owner123!");
  await prisma.user.create({
    data: {
      name: "Restaurant Owner",
      email,
      passwordHash,
      roles: { create: [{ role: "OWNER" }] },
      locations: { create: [] },
    },
  });

  console.log(`Seeded owner account: ${email} / Owner123!`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
