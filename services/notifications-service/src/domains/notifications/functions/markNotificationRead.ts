import { ApiError, type Notification } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapNotificationToDto } from "../internal/mapNotificationToDto.js";

export async function markNotificationRead(id: string): Promise<Notification> {
  const existing = await prisma.notification.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound(`Notification ${id} not found`);

  const updated = await prisma.notification.update({ where: { id }, data: { isRead: true } });
  return mapNotificationToDto(updated);
}
