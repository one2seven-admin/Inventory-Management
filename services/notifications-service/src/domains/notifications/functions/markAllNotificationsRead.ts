import type { Role } from "@platform/contracts";
import { prisma } from "../../../db/client.js";

export interface MarkAllNotificationsReadResult {
  count: number;
}

/** Marks every unread notification addressed to this user (directly or via role) as read. */
export async function markAllNotificationsRead(userId: string, roles: Role[]): Promise<MarkAllNotificationsReadResult> {
  const result = await prisma.notification.updateMany({
    where: {
      OR: [{ targetUserId: userId }, { targetRoles: { hasSome: roles } }],
      isRead: false,
    },
    data: { isRead: true },
  });
  return { count: result.count };
}
