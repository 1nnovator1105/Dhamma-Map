import type { ReactNode } from "react";

type QuoteBlockProps = {
  children: ReactNode;
  /** 인용 출처. 예: "『상윳따 니까야』 12:21" */
  source?: string;
};

/** 경전 구절 등 원문 인용. */
export function QuoteBlock({ children, source }: QuoteBlockProps) {
  return (
    <figure className="rounded-xl bg-surface px-5 py-5 sm:px-7">
      <blockquote className="text-[1.0625rem] leading-[1.9] text-foreground [&>p+p]:mt-2">
        {children}
      </blockquote>
      {source ? <figcaption className="mt-3 text-sm text-muted">— {source}</figcaption> : null}
    </figure>
  );
}
