import type { CreateLocationInput, Location } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapLocationToDto } from "../internal/mapLocationToDto.js";

/** PRD §3.5/§3.15 — register a branch, central kitchen, or warehouse. */
export async function createLocation(input: CreateLocationInput): Promise<Location> {
  const location = await prisma.location.create({
    data: { name: input.name, type: input.type, address: input.address ?? null },
  });
  return mapLocationToDto(location);
}
