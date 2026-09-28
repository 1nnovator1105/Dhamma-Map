import Link from "next/link";

import { resolveConceptSlugs } from "@/lib/content/concepts";

export type RelatedConceptsProps = {
  /** 연결된 개념 slug 목록. MDX에서는 현재 문서의 frontmatter related가 자동으로 주입된다. */
  conceptSlugs: string[];
  /**
   * 개념별 '관계 설명'. 지정하지 않은 개념은 그 개념의 summary를 보여준다.
   * 예: relationDescriptions={{ impermanence: "조건이 변하기 때문에 모든 것은 변화합니다." }}
   */
  relationDescriptions?: Record<string, string>;
};

/** 현재 문서와 연결된 개념 카드 목록 (base_spec 28·53절). */
export function RelatedConcepts({ conceptSlugs, relationDescriptions = {} }: RelatedConceptsProps) {
  const relatedConcepts = resolveConceptSlugs(conceptSlugs);
  if (relatedConcepts.length === 0) return null;

  return (
    <ul className="grid list-none gap-3 pl-0 sm:grid-cols-2">
      {relatedConcepts.map((relatedConcept) => (
        <li key={relatedConcept.slug} className="mt-0">
          <Link
            href={`/concepts/${relatedConcept.slug}`}
            className="group flex h-full flex-col rounded-xl border border-border bg-surface-raised px-5 py-4 no-underline transition-colors hover:border-accent"
          >
            <span className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-foreground group-hover:text-accent">
                {relatedConcept.title}
              </span>
              {relatedConcept.hanja ? (
                <span className="hanja text-sm text-muted">{relatedConcept.hanja}</span>
              ) : null}
            </span>
            <span className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
              {relationDescriptions[relatedConcept.slug] ?? relatedConcept.summary}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
