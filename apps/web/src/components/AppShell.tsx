import Link from "next/link";
import type { User } from "@platform/contracts";
import { roleHasCapability } from "@platform/contracts";
import { logoutAction } from "@/actions/logout";

interface NavItem {
  href: string;
  label: string;
}

function getNavItems(user: User): NavItem[] {
  const items: NavItem[] = [
    { href: "/items", label: "Items" },
    { href: "/stock", label: "Stock" },
  ];
  if (user.roles.some((role) => roleHasCapability(role, "MANAGE_USERS"))) {
    items.push({ href: "/users", label: "Users" });
  }
  return items;
}

export function AppShell({ user, children }: { user: User; children: React.ReactNode }) {
  const navItems = getNavItems(user);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="flex flex-col justify-between border-b border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950 md:w-56 md:border-b-0 md:border-r">
        <div>
          <div className="mb-6 px-2">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Smart Inventory</p>
            <p className="text-xs text-zinc-500">Restaurant Inventory Mgmt</p>
          </div>
          <nav className="flex flex-row gap-1 md:flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded px-2 py-1.5 text-sm text-zinc-700 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <p className="px-2 text-xs text-zinc-500">{user.name}</p>
          <p className="px-2 text-xs text-zinc-400">{user.roles.join(", ")}</p>
          <form action={logoutAction} className="mt-2">
            <button type="submit" className="w-full rounded px-2 py-1.5 text-left text-sm text-zinc-700 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800">
              Log out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
