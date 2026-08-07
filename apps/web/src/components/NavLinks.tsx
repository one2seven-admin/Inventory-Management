"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export interface NavItem {
  href: string;
  label: string;
  /** Pre-rendered by the caller (server component) — RSC can pass elements across
   *  the client boundary, but not raw component references. */
  icon: ReactNode;
}

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col md:overflow-visible">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2.5 whitespace-nowrap rounded border-l-2 px-2.5 py-1.5 text-sm transition-colors duration-150 ${
              active
                ? "border-primary bg-primary/10 font-medium text-primary"
                : "border-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
