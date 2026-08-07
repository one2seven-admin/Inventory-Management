import type { Item } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { ItemsTable } from "@/components/items/ItemsTable";
import { NewItemForm } from "@/components/items/NewItemForm";

export default async function ItemsPage() {
  const client = await getAuthedGatewayClient();
  const items = await client.get<Item[]>("/inventory/items");

  return (
    <div className="flex animate-fade-in-up flex-col gap-6">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Items</h1>
        <p className="text-sm text-on-surface-variant">Item master catalog</p>
      </div>
      <NewItemForm />
      <ItemsTable items={items} />
    </div>
  );
}
