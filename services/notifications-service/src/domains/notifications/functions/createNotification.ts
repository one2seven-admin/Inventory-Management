import type { CreateNotificationInput, Notification } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapNotificationToDto } from "../internal/mapNotificationToDto.js";

/**
 * PRD §3.18 — persist a notification row for the in-app notification
 * center. `referenceId` is an internal-only correlation key (itemId for
 * LOW_STOCK, batchId for EXPIRING_SOON) that alert-rules uses to dedupe
 * repeat alerts; it is not part of the public Notification contract, so
 * only in-process callers (alert-rules) can set it.
 */
export async function createNotification(
  input: CreateNotificationInput & { referenceId?: string }
): Promise<Notification> {
  const created = await prisma.notification.create({
    data: {
      type: input.type,
      title: input.title,
      message: input.message,
      targetUserId: input.targetUserId ?? null,
      targetRoles: input.targetRoles ?? [],
      locationId: input.locationId ?? null,
      referenceId: input.referenceId ?? null,
    },
  });
  return mapNotificationToDto(created);
}
