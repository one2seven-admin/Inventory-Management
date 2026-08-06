import type { Notification } from "@platform/contracts";
import { MarkReadButton } from "./MarkReadButton";

export function NotificationsList({ notifications }: { notifications: Notification[] }) {
  if (notifications.length === 0) {
    return <p className="text-sm text-stone-500">No notifications.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start justify-between gap-3 rounded-lg border p-3 transition-colors ${
            notification.isRead
              ? "border-stone-200 dark:border-stone-800"
              : "border-sky-300 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/40"
          }`}
        >
          <div className="flex items-start gap-2">
            {!notification.isRead ? (
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-500" aria-hidden="true" />
            ) : null}
            <div>
              <p className="text-sm font-medium text-stone-900 dark:text-stone-50">{notification.title}</p>
              <p className="text-sm text-stone-600 dark:text-stone-400">{notification.message}</p>
              <p className="mt-1 text-xs text-stone-400">
                {notification.type.replaceAll("_", " ")} · {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          {!notification.isRead ? <MarkReadButton notificationId={notification.id} /> : null}
        </div>
      ))}
    </div>
  );
}
