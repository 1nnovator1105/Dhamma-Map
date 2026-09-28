import Link from "next/link";

import { siteConfig } from "@/lib/site";

export type BreadcrumbItem = {
  label: string;
  /** 마지막(현재 페이지) 항목은 href를 생략한다. */
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

/** 홈 / 개념 / 연기 형태의 경로 표시. 검색 엔진용 구조화 데이터(BreadcrumbList)를 함께 출력한다. */
export function Breadcrumb({ items }: BreadcrumbProps) {
  const itemsWithHome: BreadcrumbItem[] = [{ label: "홈", href: "/" }, ...items];

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itemsWithHome.map((breadcrumbItem, itemIndex) => ({
      "@type": "ListItem",
      position: itemIndex + 1,
      name: breadcrumbItem.label,
      ...(breadcrumbItem.href ? { item: new URL(breadcrumbItem.href, siteConfig.url).toString() } : {}),
    })),
  };

  return (
    <nav aria-label="현재 위치">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {itemsWithHome.map((breadcrumbItem, itemIndex) => {
          const isLastItem = itemIndex === itemsWithHome.length - 1;
          return (
            <li key={breadcrumbItem.label} className="flex items-center gap-1.5">
              {breadcrumbItem.href && !isLastItem ? (
                <Link href={breadcrumbItem.href} className="hover:text-foreground">
                  {breadcrumbItem.label}
                </Link>
              ) : (
                <span aria-current={isLastItem ? "page" : undefined} className="text-foreground">
                  {breadcrumbItem.label}
                </span>
              )}
              {isLastItem ? null : <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData).replace(/</g, "\\u003c"),
        }}
      />
    </nav>
  );
}
