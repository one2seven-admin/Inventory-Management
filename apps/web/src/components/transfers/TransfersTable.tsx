import type { Item, Location, StockTransferRequest, TransferStatus } from "@platform/contracts";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { ApproveTransferForm } from "./ApproveTransferForm";
import { DispatchTransferForm } from "./DispatchTransferForm";
import { ReceiveTransferForm } from "./ReceiveTransferForm";

const STATUS_TONE: Record<TransferStatus, BadgeTone> = {
  REQUESTED: "neutral",
  APPROVED: "warning",
  DISPATCHED: "warning",
  RECEIVED: "success",
  CANCELLED: "danger",
};

export function TransfersTable({
  transfers,
  items,
  locations,
  canApprove,
}: {
  transfers: StockTransferRequest[];
  items: Item[];
  locations: Location[];
  canApprove: boolean;
}) {
  const itemsById = new Map(items.map((item) => [item.id, item]));
  const locationsById = new Map(locations.map((location) => [location.id, location]));

  if (transfers.length === 0) {
    return <p className="text-sm text-stone-500">No transfers involving this location yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
      <table className="w-full text-sm">
        <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500 dark:bg-stone-900">
          <tr>
            <th className="px-3 py-2">Item</th>
            <th className="px-3 py-2">From</th>
            <th className="px-3 py-2">To</th>
            <th className="px-3 py-2">Requested</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer) => (
            <tr
              key={transfer.id}
              className="border-t border-stone-100 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900/50"
            >
              <td className="px-3 py-2">{itemsById.get(transfer.itemId)?.name ?? transfer.itemId}</td>
              <td className="px-3 py-2">{locationsById.get(transfer.sourceLocationId)?.name ?? transfer.sourceLocationId}</td>
              <td className="px-3 py-2">{locationsById.get(transfer.destinationLocationId)?.name ?? transfer.destinationLocationId}</td>
              <td className="px-3 py-2">{transfer.requestedQuantity}</td>
              <td className="px-3 py-2">
                <Badge tone={STATUS_TONE[transfer.status]}>{transfer.status}</Badge>
              </td>
              <td className="px-3 py-2">
                {transfer.status === "REQUESTED" && canApprove ? <ApproveTransferForm transferId={transfer.id} /> : null}
                {transfer.status === "APPROVED" ? <DispatchTransferForm transferId={transfer.id} /> : null}
                {transfer.status === "DISPATCHED" ? (
                  <ReceiveTransferForm
                    transferId={transfer.id}
                    defaultQuantity={transfer.dispatchedQuantity ?? transfer.requestedQuantity}
                  />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
