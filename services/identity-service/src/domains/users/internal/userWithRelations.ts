import type { Prisma } from "../../../generated/prisma/index.js";

export const userWithRelationsInclude = {
  roles: true,
  locations: true,
} satisfies Prisma.UserInclude;

export type UserWithRelations = Prisma.UserGetPayload<{ include: typeof userWithRelationsInclude }>;
