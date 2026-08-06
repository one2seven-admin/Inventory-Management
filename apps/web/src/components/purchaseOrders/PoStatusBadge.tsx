import type { PoStatus } from "@platform/contracts";
import { Badge, type BadgeTone } from "@/components/ui/Badge";

const STATUS_TONE: Record<PoStatus, BadgeTone> = {
  DRAFT: "neutral",
  PENDING_APPROVAL: "warning",
  SENT: "neutral",
  CONFIRMED: "neutral",
  PARTIALLY_RECEIVED: "warning",
  RECEIVED: "success",
  CLOSED: "neutral",
  REJECTED: "danger",
};

export function PoStatusBadge({ status }: { status: PoStatus }) {
  return <Badge tone={STATUS_TONE[status]}>{status.replaceAll("_", " ")}</Badge>;
}
