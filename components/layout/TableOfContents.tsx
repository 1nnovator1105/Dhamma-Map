import type { TableOfContentsHeading } from "@/types/content";

type TableOfContentsProps = {
  headings: TableOfContentsHeading[];
};

function TableOfContentsList({ headings }: TableOfContentsProps) {
  return (
    <ol className="space-y-1.5 text-sm">
      {headings.map((heading) => (
        <li key={heading.id} className={heading.depth === 3 ? "pl-3" : undefined}>
          <a href={`#${heading.id}`} className="block leading-snug text-muted hover:text-foreground">
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** 데스크톱: 본문 오른쪽에 고정되는 목차 (base_spec 55절). */
export function DesktopTableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length < 2) return null;
  return (
    <nav aria-label="목차" className="sticky top-24">
      <p className="mb-3 text-xs font-semibold tracking-wide text-muted">이 문서의 목차</p>
      <TableOfContentsList headings={headings} />
    </nav>
  );
}

/** 모바일·태블릿: 본문 위에서 접고 펼칠 수 있는 목차. JavaScript 없이 동작한다. */
export function CollapsibleTableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length < 2) return null;
  return (
    <details className="group rounded-xl border border-border bg-surface px-4 py-3">
      <summary className="cursor-pointer list-none text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between">
          목차
          <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-180">
            ▾
          </span>
        </span>
      </summary>
      <nav aria-label="목차" className="mt-3 border-t border-border pt-3">
        <TableOfContentsList headings={headings} />
      </nav>
    </details>
  );
}
