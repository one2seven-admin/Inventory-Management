import "./loadEnv.js";
import { prisma } from "./db/client.js";
import { config } from "./config.js";

interface InventoryItem {
  id: string;
  sku: string;
}

async function findItem(sku: string): Promise<InventoryItem | null> {
  const response = await fetch(new URL("/items", config.inventoryServiceUrl), {
    headers: { "x-user-id": "seed-script", "x-user-roles": "MANAGER" },
  });
  if (!response.ok) throw new Error(`Failed to fetch items from inventory-service: ${response.status}`);
  const items = (await response.json()) as InventoryItem[];
  return items.find((item) => item.sku === sku) ?? null;
}

/**
 * Seeds one sample recipe ("Margherita Pizza") built from inventory-service's
 * seeded Mozzarella/Flour/Tomato items. Requires inventory-service to be
 * running and already seeded (`npm run db:seed -w services/inventory-service`)
 * first — this script looks up those items' ids over HTTP rather than
 * hardcoding them, since cuids are assigned at insert time. Idempotent, and
 * skips quietly (not an error) if inventory-service isn't reachable yet.
 */
async function main() {
  const existing = await prisma.recipe.findFirst({ where: { name: "Margherita Pizza", isActive: true } });
  if (existing) {
    console.log("Seed skipped — Margherita Pizza recipe already exists.");
    return;
  }

  const [tomato, flour, mozzarella] = await Promise.all([
    findItem("PRD-TOMATO"),
    findItem("DRY-FLOUR"),
    findItem("DAI-MOZZ"),
  ]);

  if (!tomato || !flour || !mozzarella) {
    console.log(
      "Seed skipped — inventory-service isn't reachable or hasn't been seeded yet " +
        "(expected items PRD-TOMATO, DRY-FLOUR, DAI-MOZZ). Start it and run " +
        "`npm run db:seed -w services/inventory-service` first, then re-run this seed."
    );
    return;
  }

  const recipe = await prisma.$transaction(async (tx) => {
    const created = await tx.recipe.create({
      data: {
        recipeGroupId: "pending",
        name: "Margherita Pizza",
        type: "MENU_ITEM",
        yieldQuantity: 1,
        yieldUnit: "plate",
        sellingPrice: 12.5,
        version: 1,
        effectiveFrom: new Date(),
        isActive: true,
        ingredients: {
          create: [
            { ingredientItemId: flour.id, quantity: 220, unit: "g" },
            { ingredientItemId: tomato.id, quantity: 90, unit: "g" },
            { ingredientItemId: mozzarella.id, quantity: 120, unit: "g" },
          ],
        },
      },
    });
    return tx.recipe.update({ where: { id: created.id }, data: { recipeGroupId: created.id } });
  });

  console.log(`Seeded recipe: Margherita Pizza (${recipe.id})`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
