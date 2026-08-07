import type { Notification, NotificationType } from "@platform/contracts";
import { TriangleAlert, Clock, ArrowLeftRight, ClipboardCheck } from "lucide-react";
import { MarkReadButton } from "./MarkReadButton";

const TYPE_ICON: Record<NotificationType, typeof TriangleAlert> = {
  LOW_STOCK: TriangleAlert,
  EXPIRING_SOON: Clock,
  TRANSFER_REQUEST: ArrowLeftRight,
  PO_APPROVAL_REQUIRED: ClipboardCheck,
};

export function NotificationsList({ notifications }: { notifications: Notification[] }) {
  if (notifications.length === 0) {
    return <p className="text-sm text-on-surface-variant">No notifications.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {notifications.map((notification) => {
        const Icon = TYPE_ICON[notification.type];
        return (
          <div
            key={notification.id}
            className={`flex items-start justify-between gap-3 rounded-md border p-3 transition-colors ${
              notification.isRead ? "border-outline-variant" : "border-primary bg-primary/5"
            }`}
          >
            <div className="flex items-start gap-2.5">
              <Icon
                className={`mt-0.5 h-4 w-4 shrink-0 ${notification.isRead ? "text-on-surface-variant" : "text-primary"}`}
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium text-on-surface">{notification.title}</p>
                <p className="text-sm text-on-surface-variant">{notification.message}</p>
                <p className="mt-1 label-caps text-on-surface-variant">
                  {notification.type.replaceAll("_", " ")} · {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            {!notification.isRead ? <MarkReadButton notificationId={notification.id} /> : null}
          </div>
        );
      })}
    </div>
  );
}
