import type { Item, Location, StockTransferRequest, TransferStatus } from "@platform/contracts";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Table, Thead, Th, Tr, Td, EmptyState } from "@/components/ui/Table";
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
    return <EmptyState>No transfers involving this location yet — use the &quot;Request transfer&quot; form above.</EmptyState>;
  }

  return (
    <Table>
      <Thead>
        <tr>
          <Th>Item</Th>
          <Th>From</Th>
          <Th>To</Th>
          <Th>Requested</Th>
          <Th>Status</Th>
          <Th>Action</Th>
        </tr>
      </Thead>
      <tbody>
        {transfers.map((transfer) => (
          <Tr key={transfer.id}>
            <Td>{itemsById.get(transfer.itemId)?.name ?? transfer.itemId}</Td>
            <Td>{locationsById.get(transfer.sourceLocationId)?.name ?? transfer.sourceLocationId}</Td>
            <Td>{locationsById.get(transfer.destinationLocationId)?.name ?? transfer.destinationLocationId}</Td>
            <Td className="font-data-mono">{transfer.requestedQuantity}</Td>
            <Td>
              <Badge tone={STATUS_TONE[transfer.status]}>{transfer.status}</Badge>
            </Td>
            <Td>
              {transfer.status === "REQUESTED" && canApprove ? <ApproveTransferForm transferId={transfer.id} /> : null}
              {transfer.status === "APPROVED" ? <DispatchTransferForm transferId={transfer.id} /> : null}
              {transfer.status === "DISPATCHED" ? (
                <ReceiveTransferForm
                  transferId={transfer.id}
                  defaultQuantity={transfer.dispatchedQuantity ?? transfer.requestedQuantity}
                />
              ) : null}
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
