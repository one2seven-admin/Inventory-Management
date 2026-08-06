import type { User } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { userWithRelationsInclude } from "../internal/userWithRelations.js";
import { mapUserToDto } from "../internal/mapUserToDto.js";

export async function listUsers(): Promise<User[]> {
  const users = await prisma.user.findMany({
    include: userWithRelationsInclude,
    orderBy: { createdAt: "asc" },
  });
  return users.map(mapUserToDto);
}
