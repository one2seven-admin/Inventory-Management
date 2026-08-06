import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { createItemInputSchema, updateItemInputSchema, listItemsQuerySchema, bulkImportItemsInputSchema } from "./schema.js";
import { requireCapability } from "../../plugins/requireCapability.js";
import { requireAuthenticated } from "../../plugins/requestAuthContext.js";
import { createItem } from "./functions/createItem.js";
import { getItemById } from "./functions/getItemById.js";
import { listItems } from "./functions/listItems.js";
import { updateItem } from "./functions/updateItem.js";
import { archiveItem } from "./functions/archiveItem.js";
import { assignBarcode } from "./functions/assignBarcode.js";
import { bulkImportItems } from "./functions/bulkImportItems.js";

const archiveBodySchema = z.object({ status: z.enum(["INACTIVE", "DISCONTINUED"]) });
const barcodeBodySchema = z.object({ barcode: z.string().min(1) });

export async function registerItemRoutes(app: FastifyInstance) {
  app.get("/items", { preHandler: requireAuthenticated }, async (request) => {
    const query = listItemsQuerySchema.parse(request.query);
    return listItems(query);
  });

  app.get<{ Params: { id: string } }>("/items/:id", { preHandler: requireAuthenticated }, async (request) => {
    return getItemById(request.params.id);
  });

  app.post("/items", { preHandler: requireCapability("MANAGE_ITEM_MASTER") }, async (request, reply) => {
    const input = createItemInputSchema.parse(request.body);
    reply.code(201);
    return createItem(input);
  });

  app.post("/items/bulk-import", { preHandler: requireCapability("MANAGE_ITEM_MASTER") }, async (request) => {
    const input = bulkImportItemsInputSchema.parse(request.body);
    return bulkImportItems(input);
  });

  app.patch<{ Params: { id: string } }>(
    "/items/:id",
    { preHandler: requireCapability("MANAGE_ITEM_MASTER") },
    async (request) => {
      const input = updateItemInputSchema.parse(request.body);
      return updateItem(request.params.id, input);
    }
  );

  app.post<{ Params: { id: string } }>(
    "/items/:id/archive",
    { preHandler: requireCapability("MANAGE_ITEM_MASTER") },
    async (request) => {
      const { status } = archiveBodySchema.parse(request.body);
      return archiveItem(request.params.id, status);
    }
  );

  app.post<{ Params: { id: string } }>(
    "/items/:id/barcode",
    { preHandler: requireCapability("MANAGE_ITEM_MASTER") },
    async (request) => {
      const { barcode } = barcodeBodySchema.parse(request.body);
      return assignBarcode(request.params.id, barcode);
    }
  );
}
