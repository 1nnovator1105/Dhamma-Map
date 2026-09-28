"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { primaryNavigationLinks } from "@/lib/site";

type PrimaryNavigationLinksProps = {
  orientation: "horizontal" | "vertical";
  onNavigate?: () => void;
};

function isCurrentSection(pathname: string, sectionHref: string): boolean {
  return pathname === sectionHref || pathname.startsWith(`${sectionHref}/`);
}

/** 헤더 주요 메뉴. 현재 보고 있는 영역에 aria-current를 표시한다. */
export function PrimaryNavigationLinks({ orientation, onNavigate }: PrimaryNavigationLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={orientation === "horizontal" ? "flex items-center gap-1" : "flex flex-col"}>
      {primaryNavigationLinks.map((navigationLink) => {
        const isCurrent = isCurrentSection(pathname, navigationLink.href);
        return (
          <li key={navigationLink.href}>
            <Link
              href={navigationLink.href}
              onClick={onNavigate}
              aria-current={isCurrent ? "page" : undefined}
              className={
                orientation === "horizontal"
                  ? `rounded-lg px-3 py-2 text-[0.9375rem] transition-colors hover:text-foreground ${
                      isCurrent ? "font-semibold text-foreground" : "text-muted"
                    }`
                  : `block rounded-lg px-3 py-3 text-base ${
                      isCurrent ? "bg-surface font-semibold text-foreground" : "text-foreground"
                    }`
              }
            >
              {navigationLink.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
