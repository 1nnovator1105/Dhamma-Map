import Link from "next/link";

import { SiteSearchDialog } from "@/components/search/SiteSearchDialog";
import { siteConfig } from "@/lib/site";

import { MobileNavigation } from "./MobileNavigation";
import { PrimaryNavigationLinks } from "./PrimaryNavigationLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2 rounded-md">
          <span className="text-lg font-bold tracking-tight">{siteConfig.name}</span>
          <span className="hidden text-xs font-medium tracking-wide text-muted sm:inline">
            {siteConfig.englishName}
          </span>
        </Link>

        <nav aria-label="주요 메뉴" className="ml-4 hidden md:block">
          <PrimaryNavigationLinks orientation="horizontal" />
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SiteSearchDialog />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
