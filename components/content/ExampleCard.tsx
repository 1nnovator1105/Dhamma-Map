import type { ReactNode } from "react";

type ExampleCardProps = {
  title?: string;
  children: ReactNode;
};

/** 개념을 일상의 장면으로 풀어 보여주는 예시 (base_spec 20절). */
export function ExampleCard({ title, children }: ExampleCardProps) {
  return (
    <aside
      aria-label={title ? `예시: ${title}` : "예시"}
      className="rounded-xl border border-border bg-surface px-5 py-5 sm:px-6"
    >
      <p className="text-sm font-semibold text-accent">일상 속 장면</p>
      {title ? <p className="mt-1 text-lg font-semibold text-foreground">{title}</p> : null}
      <div className="mt-3 space-y-3 leading-[1.8] [&_li+li]:mt-1 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </aside>
  );
}
