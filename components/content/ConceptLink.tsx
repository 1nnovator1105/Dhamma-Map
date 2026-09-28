import Link from "next/link";
import type { ReactNode } from "react";

import { getConceptMetadataBySlug } from "@/lib/content/concepts";

type ConceptLinkProps = {
  slug: string;
  /** 링크 텍스트. 생략하면 개념 제목을 사용한다. */
  children?: ReactNode;
};

/** 본문 안에서 다른 개념으로 이어지는 링크. 없는 slug면 링크 없이 텍스트만 보여준다. */
export function ConceptLink({ slug, children }: ConceptLinkProps) {
  const linkedConcept = getConceptMetadataBySlug(slug);

  if (!linkedConcept) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[법의 지도] ConceptLink: 존재하지 않는 개념 slug "${slug}"`);
    }
    return <>{children ?? slug}</>;
  }

  return <Link href={`/concepts/${linkedConcept.slug}`}>{children ?? linkedConcept.title}</Link>;
}
