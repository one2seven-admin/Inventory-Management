import type { User, Role } from "@platform/contracts";
import type { UserWithRelations } from "./userWithRelations.js";

export function mapUserToDto(user: UserWithRelations): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles.map((r) => r.role as Role),
    locationIds: user.locations.map((l) => l.locationId),
    isActive: user.isActive,
    createdAt: user.createdAt.toISOString(),
  };
}
