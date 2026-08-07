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
    <div className="flex animate-fade-in-up flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-headline text-2xl font-bold text-on-surface">Alerts</h1>
          <p className="text-sm text-on-surface-variant">Notification center</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/alerts"
            className={`rounded border px-3 py-1.5 text-sm transition-colors duration-150 ${
              unreadOnly !== "true"
                ? "border-primary text-primary"
                : "border-outline text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            All
          </Link>
          <Link
            href="/alerts?unreadOnly=true"
            className={`rounded border px-3 py-1.5 text-sm transition-colors duration-150 ${
              unreadOnly === "true"
                ? "border-primary text-primary"
                : "border-outline text-on-surface-variant hover:bg-surface-container-high"
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
