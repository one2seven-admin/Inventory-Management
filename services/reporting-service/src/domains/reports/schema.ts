import { z } from "zod";

export { reportPeriodQuerySchema, type ReportPeriodQuery } from "@platform/contracts";

export const stockValuationQuerySchema = z.object({
  locationId: z.string().optional(),
});
export type StockValuationQuery = z.infer<typeof stockValuationQuerySchema>;
