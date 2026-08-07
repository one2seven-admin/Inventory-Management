import type { User } from "@platform/contracts";
import { roleHasCapability } from "@platform/contracts";
import { logoutAction } from "@/actions/logout";
import { NavLinks, type NavItem } from "@/components/NavLinks";
import { IconLogout } from "@/components/icons";

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

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function AppShell({ user, children }: { user: User; children: React.ReactNode }) {
  const navItems = getNavItems(user);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="flex flex-col justify-between border-b border-stone-200/70 bg-white/90 p-4 backdrop-blur-sm dark:border-stone-800 dark:bg-stone-950/90 md:sticky md:top-0 md:h-screen md:w-60 md:border-b-0 md:border-r">
        <div>
          <div className="mb-6 flex items-center gap-2.5 px-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-brand text-sm font-bold text-brand-foreground shadow-sm">
              SI
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-stone-900 dark:text-stone-50">Smart Inventory</p>
              <p className="truncate text-xs text-stone-500">Restaurant Inventory Mgmt</p>
            </div>
          </div>
          <NavLinks items={navItems} />
        </div>
        <div className="mt-6 border-t border-stone-200/70 pt-4 dark:border-stone-800">
          <div className="flex items-center gap-2.5 px-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-200 text-xs font-semibold text-stone-700 dark:bg-stone-800 dark:text-stone-300">
              {getInitials(user.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-stone-900 dark:text-stone-50">{user.name}</p>
              <p className="truncate text-xs text-stone-400">{user.roles.join(", ")}</p>
            </div>
          </div>
          <form action={logoutAction} className="mt-2">
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-stone-600 transition-colors duration-150 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-50"
            >
              <IconLogout className="h-4 w-4" />
              Log out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 bg-stone-50/60 p-6 dark:bg-stone-900/40">{children}</main>
    </div>
  );
}
