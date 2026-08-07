import "./loadEnv.js";
import { prisma } from "./db/client.js";

/** Seeds a starter location + a few common items so the UI has something to show. Idempotent. */
async function main() {
  let location = await prisma.location.findFirst({ where: { name: "Main Branch" } });
  if (!location) {
    location = await prisma.location.create({
      data: { name: "Main Branch", type: "BRANCH", address: "1 Market Street" },
    });
    await prisma.storageArea.createMany({
      data: [
        { locationId: location.id, name: "Dry Store", type: "DRY_STORE" },
        { locationId: location.id, name: "Walk-in Cooler", type: "WALK_IN_COOLER" },
        { locationId: location.id, name: "Freezer", type: "FREEZER" },
      ],
    });
    console.log(`Seeded location: ${location.name} (${location.id})`);
  } else {
    console.log("Seed skipped — Main Branch already exists.");
  }

  const items = [
    {
      sku: "PRD-TOMATO",
      name: "Roma Tomato",
      category: "PRODUCE",
      purchaseUom: "case",
      stockUom: "kg",
      recipeUom: "g",
      purchaseToStockFactor: 9,
      stockToRecipeFactor: 1000,
      isPerishable: true,
      defaultShelfLifeDays: 7,
    },
    {
      sku: "DRY-FLOUR",
      name: "All-Purpose Flour",
      category: "DRY_GOODS",
      purchaseUom: "bag",
      stockUom: "kg",
      recipeUom: "g",
      purchaseToStockFactor: 25,
      stockToRecipeFactor: 1000,
      isPerishable: false,
      defaultShelfLifeDays: null,
    },
    {
      sku: "DAI-MOZZ",
      name: "Mozzarella Cheese",
      category: "DAIRY",
      purchaseUom: "case",
      stockUom: "kg",
      recipeUom: "g",
      purchaseToStockFactor: 5,
      stockToRecipeFactor: 1000,
      isPerishable: true,
      defaultShelfLifeDays: 21,
    },
  ] as const;

  for (const item of items) {
    const existing = await prisma.item.findUnique({ where: { sku: item.sku } });
    if (existing) continue;
    await prisma.item.create({ data: item });
    console.log(`Seeded item: ${item.name}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
