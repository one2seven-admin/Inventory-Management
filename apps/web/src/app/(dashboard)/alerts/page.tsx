import Link from "next/link";
import type { Notification } from "@platform/contracts";
import { roleHasCapability } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";
import { NotificationsList } from "@/components/alerts/NotificationsList";
import { MarkAllReadButton } from "@/components/alerts/MarkAllReadButton";
import { RunAlertRulesButton } from "@/components/alerts/RunAlertRulesButton";

export default async function AlertsPage({
  searchParams,
}: {
  searchParams: Promise<{ unreadOnly?: string }>;
}) {
  const { unreadOnly } = await searchParams;
  const [client, user] = await Promise.all([getAuthedGatewayClient(), getCurrentUser()]);

  const notifications = await client.get<Notification[]>("/notifications/notifications", {
    unreadOnly: unreadOnly === "true",
  });

  const canRunAlertRules = user?.roles.some((role) => roleHasCapability(role, "MANAGE_USERS")) ?? false;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Alerts</h1>
          <p className="text-sm text-zinc-500">Notification center — PRD §3.18</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/alerts"
            className={`rounded border px-3 py-1.5 text-sm ${
              unreadOnly !== "true"
                ? "border-zinc-900 dark:border-zinc-100"
                : "border-zinc-300 text-zinc-500 dark:border-zinc-700"
            }`}
          >
            All
          </Link>
          <Link
            href="/alerts?unreadOnly=true"
            className={`rounded border px-3 py-1.5 text-sm ${
              unreadOnly === "true"
                ? "border-zinc-900 dark:border-zinc-100"
                : "border-zinc-300 text-zinc-500 dark:border-zinc-700"
            }`}
          >
            Unread
          </Link>
          <MarkAllReadButton />
        </div>
      </div>

      {canRunAlertRules ? <RunAlertRulesButton /> : null}

      <NotificationsList notifications={notifications} />
    </div>
  );
}
