import { z } from "zod";

/** Body for the manual alert-sweep trigger — both fields optional, mirroring the scheduler's defaults. */
export const runAlertRulesInputSchema = z.object({
  locationId: z.string().optional(),
  withinDays: z.coerce.number().int().positive().optional(),
});
export type RunAlertRulesInput = z.infer<typeof runAlertRulesInputSchema>;
