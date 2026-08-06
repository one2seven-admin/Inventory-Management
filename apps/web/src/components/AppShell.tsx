import type { User } from "@platform/contracts";
import { roleHasCapability } from "@platform/contracts";
import { logoutAction } from "@/actions/logout";
import { NavLinks, type NavItem } from "@/components/NavLinks";

function getNavItems(user: User): NavItem[] {
  const items: NavItem[] = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/items", label: "Items" },
    { href: "/stock", label: "Stock" },
    { href: "/suppliers", label: "Suppliers" },
    { href: "/purchase-orders", label: "Purchase orders" },
  ];
  if (user.roles.some((role) => roleHasCapability(role, "CREATE_PURCHASE_ORDER"))) {
    items.push({ href: "/reorder-suggestions", label: "Reorder suggestions" });
  }
  items.push(
    { href: "/recipes", label: "Recipes" },
    { href: "/wastage", label: "Wastage" },
    { href: "/transfers", label: "Transfers" },
    { href: "/alerts", label: "Alerts" },
    { href: "/reports", label: "Reports" }
  );
  if (user.roles.some((role) => roleHasCapability(role, "MANAGE_USERS"))) {
    items.push({ href: "/users", label: "Users" });
  }
  return items;
}

export function AppShell({ user, children }: { user: User; children: React.ReactNode }) {
  const navItems = getNavItems(user);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="flex flex-col justify-between border-b border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-950 md:w-56 md:border-b-0 md:border-r">
        <div>
          <div className="mb-6 px-2">
            <p className="text-sm font-semibold text-stone-900 dark:text-stone-50">Smart Inventory</p>
            <p className="text-xs text-stone-500">Restaurant Inventory Mgmt</p>
          </div>
          <NavLinks items={navItems} />
        </div>
        <div className="mt-6 border-t border-stone-200 pt-4 dark:border-stone-800">
          <p className="px-2 text-xs text-stone-500">{user.name}</p>
          <p className="px-2 text-xs text-stone-400">{user.roles.join(", ")}</p>
          <form action={logoutAction} className="mt-2">
            <button
              type="submit"
              className="w-full rounded px-2 py-1.5 text-left text-sm text-stone-700 transition-colors duration-150 hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-stone-800"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
