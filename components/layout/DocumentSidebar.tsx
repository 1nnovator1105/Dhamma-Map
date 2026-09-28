import Link from "next/link";

export type DocumentSidebarItem = {
  href: string;
  label: string;
  /** 제목 옆에 작게 붙는 표기. 예: 한자 */
  secondaryLabel?: string;
};

type DocumentSidebarProps = {
  heading: { label: string; href: string };
  items: DocumentSidebarItem[];
  currentHref: string;
};

/** 문서 페이지 왼쪽의 같은 종류 문서 목록 (개념 목록, 주제 목록). */
export function DocumentSidebar({ heading, items, currentHref }: DocumentSidebarProps) {
  return (
    <nav aria-label={`${heading.label} 목록`} className="sticky top-24">
      <p className="mb-3 text-xs font-semibold tracking-wide text-muted">
        <Link href={heading.href} className="hover:text-foreground">
          {heading.label}
        </Link>
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => {
          const isCurrent = item.href === currentHref;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className={`-ml-2 flex items-baseline gap-1.5 rounded-md px-2 py-1.5 text-sm leading-snug ${
                  isCurrent ? "bg-accent-soft font-semibold text-accent" : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
                {item.secondaryLabel ? (
                  <span className="hanja text-xs opacity-70">{item.secondaryLabel}</span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
