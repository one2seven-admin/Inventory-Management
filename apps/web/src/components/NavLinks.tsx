"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconArrowLeftRight,
  IconBarChart,
  IconBell,
  IconBox,
  IconChefHat,
  IconClipboard,
  IconDashboard,
  IconLayers,
  IconRepeat,
  IconTrash,
  IconTruck,
  IconUsers,
  type IconComponent,
} from "@/components/icons";

export interface NavItem {
  href: string;
  label: string;
}

const ICONS: Record<string, IconComponent> = {
  "/dashboard": IconDashboard,
  "/items": IconBox,
  "/stock": IconLayers,
  "/suppliers": IconTruck,
  "/purchase-orders": IconClipboard,
  "/reorder-suggestions": IconRepeat,
  "/recipes": IconChefHat,
  "/wastage": IconTrash,
  "/transfers": IconArrowLeftRight,
  "/alerts": IconBell,
  "/reports": IconBarChart,
  "/users": IconUsers,
};

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row gap-1 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = ICONS[item.href] ?? IconBell;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`group flex shrink-0 items-center gap-2.5 rounded-lg border-l-2 px-2.5 py-2 text-sm transition-all duration-200 ${
              active
                ? "border-brand bg-gradient-to-r from-amber-50 to-transparent font-medium text-brand dark:from-amber-500/10"
                : "border-transparent text-stone-600 hover:translate-x-0.5 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-50"
            }`}
          >
            <Icon
              className={`h-4 w-4 shrink-0 transition-colors duration-200 ${
                active
                  ? "text-brand"
                  : "text-stone-400 group-hover:text-stone-600 dark:text-stone-500 dark:group-hover:text-stone-300"
              }`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
