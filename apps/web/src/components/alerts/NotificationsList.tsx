import type { Notification } from "@platform/contracts";
import { MarkReadButton } from "./MarkReadButton";

export function NotificationsList({ notifications }: { notifications: Notification[] }) {
  if (notifications.length === 0) {
    return <p className="text-sm text-zinc-500">No notifications.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start justify-between gap-3 rounded border p-3 ${
            notification.isRead
              ? "border-zinc-200 dark:border-zinc-800"
              : "border-blue-300 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40"
          }`}
        >
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{notification.title}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{notification.message}</p>
            <p className="mt-1 text-xs text-zinc-400">
              {notification.type.replaceAll("_", " ")} · {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
          {!notification.isRead ? <MarkReadButton notificationId={notification.id} /> : null}
        </div>
      ))}
    </div>
  );
}
