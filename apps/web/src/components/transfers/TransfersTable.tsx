import type { Item, Location, StockTransferRequest, TransferStatus } from "@platform/contracts";
import { ApproveTransferForm } from "./ApproveTransferForm";
import { DispatchTransferForm } from "./DispatchTransferForm";
import { ReceiveTransferForm } from "./ReceiveTransferForm";

const STATUS_CLASSES: Record<TransferStatus, string> = {
  REQUESTED: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  APPROVED: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  DISPATCHED: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  RECEIVED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
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
    return <p className="text-sm text-zinc-500">No transfers involving this location yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500 dark:bg-zinc-900">
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
            <tr key={transfer.id} className="border-t border-zinc-100 dark:border-zinc-800">
              <td className="px-3 py-2">{itemsById.get(transfer.itemId)?.name ?? transfer.itemId}</td>
              <td className="px-3 py-2">{locationsById.get(transfer.sourceLocationId)?.name ?? transfer.sourceLocationId}</td>
              <td className="px-3 py-2">{locationsById.get(transfer.destinationLocationId)?.name ?? transfer.destinationLocationId}</td>
              <td className="px-3 py-2">{transfer.requestedQuantity}</td>
              <td className="px-3 py-2">
                <span className={`rounded px-2 py-0.5 text-xs font-medium ${STATUS_CLASSES[transfer.status]}`}>
                  {transfer.status}
                </span>
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
