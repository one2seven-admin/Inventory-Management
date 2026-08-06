import type { StorageArea } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapStorageAreaToDto } from "../internal/mapLocationToDto.js";

export async function listStorageAreas(locationId: string): Promise<StorageArea[]> {
  const areas = await prisma.storageArea.findMany({ where: { locationId }, orderBy: { name: "asc" } });
  return areas.map(mapStorageAreaToDto);
}
