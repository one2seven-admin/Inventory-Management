"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  href: string;
  label: string;
}

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row gap-1 md:flex-col">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`rounded border-l-2 px-2 py-1.5 text-sm transition-colors duration-150 ${
              active
                ? "border-brand bg-brand/10 font-medium text-brand"
                : "border-transparent text-stone-700 hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-stone-800"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
