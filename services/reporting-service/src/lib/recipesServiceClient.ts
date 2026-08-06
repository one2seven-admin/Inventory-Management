import { ApiError, AUTH_HEADER, type Recipe, type RecipeCost } from "@platform/contracts";
import { config } from "../config.js";
import type { RequestAuthContext } from "../plugins/requestAuthContext.js";

function authHeaders(authContext: RequestAuthContext): Record<string, string> {
  return {
    "content-type": "application/json",
    [AUTH_HEADER.USER_ID]: authContext.userId ?? "",
    [AUTH_HEADER.ROLES]: authContext.roles.join(","),
  };
}

async function request<T>(path: string, authContext: RequestAuthContext): Promise<T> {
  const response = await fetch(`${config.recipesServiceUrl}${path}`, {
    method: "GET",
    headers: authHeaders(authContext),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new ApiError(502, "RECIPES_SERVICE_ERROR", `recipes-service request failed (${response.status} GET ${path}): ${text}`);
  }

  return (await response.json()) as T;
}

export function listRecipes(authContext: RequestAuthContext): Promise<Recipe[]> {
  return request<Recipe[]>("/recipes?type=MENU_ITEM", authContext);
}

export function getRecipeCost(recipeId: string, authContext: RequestAuthContext): Promise<RecipeCost> {
  return request<RecipeCost>(`/recipes/${recipeId}/cost`, authContext);
}
