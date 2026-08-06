import { getUserById } from "../../users/functions/getUserById.js";
import type { User } from "@platform/contracts";

export async function getCurrentUser(userId: string): Promise<User> {
  return getUserById(userId);
}
