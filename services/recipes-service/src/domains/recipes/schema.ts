import { z } from "zod";
import { recipeTypeSchema } from "@platform/contracts";

export {
  createRecipeInputSchema,
  updateRecipeInputSchema,
  recipeTypeSchema,
  type CreateRecipeInput,
  type UpdateRecipeInput,
  type RecipeType,
} from "@platform/contracts";

/** Not part of the shared contracts (it's a query-string shape specific to this route). */
export const listRecipesQuerySchema = z.object({
  type: recipeTypeSchema.optional(),
});
export type ListRecipesQuery = z.infer<typeof listRecipesQuerySchema>;
