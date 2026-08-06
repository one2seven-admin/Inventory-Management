import { z } from "zod";

export const notificationTypeSchema = z.enum([
  "LOW_STOCK",
  "EXPIRING_SOON",
  "PO_APPROVAL_REQUIRED",
  "TRANSFER_REQUEST",
]);
export type NotificationType = z.infer<typeof notificationTypeSchema>;

export const notificationSchema = z.object({
  id: z.string(),
  type: notificationTypeSchema,
  title: z.string(),
  message: z.string(),
  targetUserId: z.string().nullable(),
  targetRoles: z.array(z.string()),
  locationId: z.string().nullable(),
  isRead: z.boolean(),
  createdAt: z.string(),
});
export type Notification = z.infer<typeof notificationSchema>;

export const createNotificationInputSchema = z.object({
  type: notificationTypeSchema,
  title: z.string().min(1),
  message: z.string().min(1),
  targetUserId: z.string().optional(),
  targetRoles: z.array(z.string()).default([]),
  locationId: z.string().optional(),
});
export type CreateNotificationInput = z.infer<typeof createNotificationInputSchema>;

export const listNotificationsQuerySchema = z.object({
  userId: z.string().optional(),
  unreadOnly: z.coerce.boolean().default(false),
});
export type ListNotificationsQuery = z.infer<typeof listNotificationsQuerySchema>;
