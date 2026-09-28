import type { ReactNode } from "react";

type ConceptSummaryProps = {
  children: ReactNode;
};

/** 문서 맨 앞의 한 문장 설명. 카드보다는 절제된 강조로 표현한다 (base_spec 19절). */
export function ConceptSummary({ children }: ConceptSummaryProps) {
  return (
    <div className="border-l-[3px] border-accent py-1 pl-5 text-lg leading-relaxed font-medium text-foreground sm:text-xl [&>p]:m-0 [&>p+p]:mt-3">
      {children}
    </div>
  );
}
