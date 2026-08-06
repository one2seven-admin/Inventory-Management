import { ApiError, type User } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { userWithRelationsInclude } from "../internal/userWithRelations.js";
import { mapUserToDto } from "../internal/mapUserToDto.js";

/** PRD §3.16/§3.19 — retire access without deleting the user's audit history. */
export async function deactivateUser(userId: string): Promise<User> {
  const existing = await prisma.user.findUnique({ where: { id: userId } });
  if (!existing) throw ApiError.notFound(`User ${userId} not found`);

  const user = await prisma.user.update({
    where: { id: userId },
    data: { isActive: false },
    include: userWithRelationsInclude,
  });

  return mapUserToDto(user);
}
