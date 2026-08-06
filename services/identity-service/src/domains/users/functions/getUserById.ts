import { ApiError, type User } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { userWithRelationsInclude } from "../internal/userWithRelations.js";
import { mapUserToDto } from "../internal/mapUserToDto.js";

export async function getUserById(id: string): Promise<User> {
  const user = await prisma.user.findUnique({ where: { id }, include: userWithRelationsInclude });
  if (!user) throw ApiError.notFound(`User ${id} not found`);
  return mapUserToDto(user);
}
