import type { Item } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { ItemsTable } from "@/components/items/ItemsTable";
import { NewItemForm } from "@/components/items/NewItemForm";

export default async function ItemsPage() {
  const client = await getAuthedGatewayClient();
  const items = await client.get<Item[]>("/inventory/items");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Items</h1>
        <p className="text-sm text-zinc-500">Item master catalog — PRD §3.1</p>
      </div>
      <NewItemForm />
      <ItemsTable items={items} />
    </div>
  );
}
