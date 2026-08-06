import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { createSupplierInputSchema, updateSupplierInputSchema, upsertSupplierItemPriceInputSchema } from "./schema.js";
import { requireCapability } from "../../plugins/requireCapability.js";
import { requireAuthenticated } from "../../plugins/requestAuthContext.js";
import { createSupplier } from "./functions/createSupplier.js";
import { getSupplierById } from "./functions/getSupplierById.js";
import { listSuppliers } from "./functions/listSuppliers.js";
import { updateSupplier } from "./functions/updateSupplier.js";
import { upsertSupplierItemPrice } from "./functions/upsertSupplierItemPrice.js";
import { listSupplierItemPrices } from "./functions/listSupplierItemPrices.js";

const listSuppliersQuerySchema = z.object({ activeOnly: z.coerce.boolean().optional() });
const itemPricesQuerySchema = z.object({ itemId: z.string() });

// Reading supplier/price data is open to any authenticated user (PRD §3.2
// price comparison is used by purchasing, but also read by owners/managers
// reviewing reorder suggestions); creating/editing suppliers and prices
// requires MANAGE_ITEM_MASTER (Owner/Manager/Purchasing per PRD §6).
export async function registerSupplierRoutes(app: FastifyInstance) {
  app.get("/suppliers", { preHandler: requireAuthenticated }, async (request) => {
    const { activeOnly } = listSuppliersQuerySchema.parse(request.query);
    return listSuppliers(activeOnly);
  });

  app.get<{ Params: { id: string } }>("/suppliers/:id", { preHandler: requireAuthenticated }, async (request) => {
    return getSupplierById(request.params.id);
  });

  app.post("/suppliers", { preHandler: requireCapability("MANAGE_ITEM_MASTER") }, async (request, reply) => {
    const input = createSupplierInputSchema.parse(request.body);
    reply.code(201);
    return createSupplier(input);
  });

  app.patch<{ Params: { id: string } }>(
    "/suppliers/:id",
    { preHandler: requireCapability("MANAGE_ITEM_MASTER") },
    async (request) => {
      const input = updateSupplierInputSchema.parse(request.body);
      return updateSupplier(request.params.id, input);
    }
  );

  app.get("/supplier-item-prices", { preHandler: requireAuthenticated }, async (request) => {
    const { itemId } = itemPricesQuerySchema.parse(request.query);
    return listSupplierItemPrices(itemId);
  });

  app.put(
    "/supplier-item-prices",
    { preHandler: requireCapability("MANAGE_ITEM_MASTER") },
    async (request, reply) => {
      const input = upsertSupplierItemPriceInputSchema.parse(request.body);
      reply.code(200);
      return upsertSupplierItemPrice(input);
    }
  );
}
