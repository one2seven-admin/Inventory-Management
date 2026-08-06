import { z } from "zod";

export const recipeTypeSchema = z.enum(["MENU_ITEM", "SUB_RECIPE"]);
export type RecipeType = z.infer<typeof recipeTypeSchema>;

/** A recipe ingredient is either a raw item or another (sub-)recipe. */
export const recipeIngredientSchema = z.object({
  id: z.string(),
  ingredientItemId: z.string().nullable(),
  ingredientRecipeId: z.string().nullable(),
  quantity: z.number().positive(),
  unit: z.string(),
});
export type RecipeIngredient = z.infer<typeof recipeIngredientSchema>;

export const recipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: recipeTypeSchema,
  yieldQuantity: z.number().positive(),
  yieldUnit: z.string(),
  sellingPrice: z.number().nonnegative().nullable(),
  ingredients: z.array(recipeIngredientSchema),
  version: z.number().int().positive(),
  effectiveFrom: z.string(),
  isActive: z.boolean(),
});
export type Recipe = z.infer<typeof recipeSchema>;

export const recipeIngredientInputSchema = z.object({
  ingredientItemId: z.string().optional(),
  ingredientRecipeId: z.string().optional(),
  quantity: z.number().positive(),
  unit: z.string().min(1),
});

export const createRecipeInputSchema = z.object({
  name: z.string().min(1),
  type: recipeTypeSchema,
  yieldQuantity: z.number().positive(),
  yieldUnit: z.string().min(1),
  sellingPrice: z.number().nonnegative().optional(),
  ingredients: z.array(recipeIngredientInputSchema).min(1),
});
export type CreateRecipeInput = z.infer<typeof createRecipeInputSchema>;

export const updateRecipeInputSchema = createRecipeInputSchema.partial();
export type UpdateRecipeInput = z.infer<typeof updateRecipeInputSchema>;

export const recipeCostBreakdownLineSchema = z.object({
  ingredientLabel: z.string(),
  quantity: z.number(),
  unit: z.string(),
  unitCost: z.number(),
  lineCost: z.number(),
});
export type RecipeCostBreakdownLine = z.infer<typeof recipeCostBreakdownLineSchema>;

export const recipeCostSchema = z.object({
  recipeId: z.string(),
  plateCost: z.number().nonnegative(),
  sellingPrice: z.number().nonnegative().nullable(),
  foodCostPercent: z.number().nonnegative().nullable(),
  breakdown: z.array(recipeCostBreakdownLineSchema),
});
export type RecipeCost = z.infer<typeof recipeCostSchema>;
