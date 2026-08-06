import "dotenv/config";
import { prisma } from "./db/client.js";
import { config } from "./config.js";

/**
 * Seeds two suppliers + preferred item prices against inventory-service's
 * own seeded items (Roma Tomato, Mozzarella, All-Purpose Flour). Requires
 * inventory-service to be running and already seeded — falls back to a
 * no-op with a log line per item if it can't find a match, rather than
 * failing the whole run. Idempotent.
 */
const SEED_USER_ID = "seed-script";

async function fetchItemBySku(sku: string) {
  const response = await fetch(`${config.inventoryServiceUrl}/items?search=${encodeURIComponent(sku)}`, {
    headers: { "x-user-id": SEED_USER_ID },
  });
  if (!response.ok) return null;
  const items = (await response.json()) as { id: string; sku: string }[];
  return items.find((item) => item.sku === sku) ?? null;
}

async function main() {
  let produceSupplier = await prisma.supplier.findFirst({ where: { name: "Fresh Farms Produce Co." } });
  if (!produceSupplier) {
    produceSupplier = await prisma.supplier.create({
      data: {
        name: "Fresh Farms Produce Co.",
        contactName: "Priya Nair",
        contactEmail: "orders@freshfarms.test",
        contactPhone: "+91-98765-43210",
        paymentTerms: "NET_15",
        leadTimeDays: 2,
        deliverySchedule: "Mon/Wed/Fri",
      },
    });
    console.log(`Seeded supplier: ${produceSupplier.name} (${produceSupplier.id})`);
  } else {
    console.log("Seed skipped — Fresh Farms Produce Co. already exists.");
  }

  let dryGoodsSupplier = await prisma.supplier.findFirst({ where: { name: "Metro Dry Goods Wholesale" } });
  if (!dryGoodsSupplier) {
    dryGoodsSupplier = await prisma.supplier.create({
      data: {
        name: "Metro Dry Goods Wholesale",
        contactName: "Ramesh Iyer",
        contactEmail: "sales@metrodrygoods.test",
        paymentTerms: "NET_30",
        leadTimeDays: 4,
        deliverySchedule: "Weekly - Thursday",
      },
    });
    console.log(`Seeded supplier: ${dryGoodsSupplier.name} (${dryGoodsSupplier.id})`);
  } else {
    console.log("Seed skipped — Metro Dry Goods Wholesale already exists.");
  }

  const priceSeeds = [
    { sku: "PRD-TOMATO", supplierId: produceSupplier.id, price: 3.2, packSize: "9kg case", moq: 1 },
    { sku: "DAI-MOZZ", supplierId: produceSupplier.id, price: 9.5, packSize: "5kg case", moq: 1 },
    { sku: "DRY-FLOUR", supplierId: dryGoodsSupplier.id, price: 18, packSize: "25kg bag", moq: 1 },
  ] as const;

  for (const seed of priceSeeds) {
    const item = await fetchItemBySku(seed.sku);
    if (!item) {
      console.log(`Skipped price seed for ${seed.sku} — item not found in inventory-service (is it running & seeded?)`);
      continue;
    }
    const existing = await prisma.supplierItemPrice.findUnique({
      where: { supplierId_itemId: { supplierId: seed.supplierId, itemId: item.id } },
    });
    if (existing) {
      console.log(`Seed skipped — price for ${seed.sku} already exists.`);
      continue;
    }
    await prisma.supplierItemPrice.create({
      data: {
        supplierId: seed.supplierId,
        itemId: item.id,
        price: seed.price,
        packSize: seed.packSize,
        moq: seed.moq,
        isPreferred: true,
      },
    });
    console.log(`Seeded preferred price: ${seed.sku} -> ${seed.price} (supplier ${seed.supplierId})`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
