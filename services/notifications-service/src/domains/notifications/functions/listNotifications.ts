import type { Notification, Role } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapNotificationToDto } from "../internal/mapNotificationToDto.js";

export interface ListNotificationsParams {
  userId: string;
  roles: Role[];
  unreadOnly?: boolean;
}

/**
 * PRD §3.18 — in-app notification center feed: rows addressed to this user
 * directly (targetUserId) or to any role this user holds (targetRoles),
 * optionally filtered to unread only.
 */
export async function listNotifications(params: ListNotificationsParams): Promise<Notification[]> {
  const rows = await prisma.notification.findMany({
    where: {
      OR: [{ targetUserId: params.userId }, { targetRoles: { hasSome: params.roles } }],
      ...(params.unreadOnly ? { isRead: false } : {}),
    },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(mapNotificationToDto);
}
