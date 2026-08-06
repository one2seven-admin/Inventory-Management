import type { FastifyInstance } from "fastify";
import { z } from "zod";
import {
  receiveStockInputSchema,
  issueStockInputSchema,
  adjustStockInputSchema,
  setParLevelsInputSchema,
  submitStockCountInputSchema,
} from "./schema.js";
import { requireCapability } from "../../plugins/requireCapability.js";
import { requireAuthenticated } from "../../plugins/requestAuthContext.js";
import { receiveStock } from "./functions/receiveStock.js";
import { issueStock } from "./functions/issueStock.js";
import { adjustStock } from "./functions/adjustStock.js";
import { getOnHandStock } from "./functions/getOnHandStock.js";
import { setParLevels } from "./functions/setParLevels.js";
import { listBelowParStockLevels } from "./functions/listBelowParStockLevels.js";
import { getStockValuation } from "./functions/getStockValuation.js";
import { submitStockCount } from "./functions/submitStockCount.js";
import { listStockTransactions } from "./functions/listStockTransactions.js";

const locationQuerySchema = z.object({ locationId: z.string().optional() });

export async function registerStockLedgerRoutes(app: FastifyInstance) {
  app.get("/stock/levels", { preHandler: requireAuthenticated }, async (request) => {
    const { locationId } = locationQuerySchema.parse(request.query);
    return getOnHandStock(locationId);
  });

  app.get("/stock/below-par", { preHandler: requireAuthenticated }, async (request) => {
    const { locationId } = locationQuerySchema.parse(request.query);
    return listBelowParStockLevels(locationId);
  });

  app.get("/stock/valuation", { preHandler: requireAuthenticated }, async (request) => {
    const { locationId } = locationQuerySchema.parse(request.query);
    return getStockValuation(locationId);
  });

  app.get("/stock/transactions", { preHandler: requireAuthenticated }, async (request) => {
    const query = z.object({ itemId: z.string().optional(), locationId: z.string().optional() }).parse(request.query);
    return listStockTransactions(query);
  });

  app.post("/stock/receive", { preHandler: requireCapability("RECEIVE_GOODS") }, async (request) => {
    const input = receiveStockInputSchema.parse(request.body);
    return receiveStock(input);
  });

  app.post("/stock/issue", { preHandler: requireAuthenticated }, async (request) => {
    const input = issueStockInputSchema.parse(request.body);
    return issueStock(input);
  });

  app.post("/stock/adjust", { preHandler: requireCapability("APPROVE_STOCK_ADJUSTMENT") }, async (request) => {
    const input = adjustStockInputSchema.parse(request.body);
    return adjustStock(input);
  });

  app.put("/stock/par-levels", { preHandler: requireCapability("MANAGE_ITEM_MASTER") }, async (request) => {
    const input = setParLevelsInputSchema.parse(request.body);
    return setParLevels(input);
  });

  app.post("/stock/counts", { preHandler: requireCapability("PERFORM_STOCK_COUNT") }, async (request) => {
    const input = submitStockCountInputSchema.parse(request.body);
    return submitStockCount(input);
  });
}
