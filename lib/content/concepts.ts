import "server-only";

import type { ConceptCategory, ConceptDocument, ConceptMetadata } from "@/types/content";

import { loadContentRepository } from "./repository";
import { conceptCategories } from "./taxonomy";

const fallbackOrder = Number.MAX_SAFE_INTEGER;

function compareConceptsByOrder(first: ConceptMetadata, second: ConceptMetadata): number {
  const orderDifference = (first.order ?? fallbackOrder) - (second.order ?? fallbackOrder);
  return orderDifference !== 0 ? orderDifference : first.title.localeCompare(second.title, "ko");
}

/** 노출 가능한 모든 개념 문서를 order → 제목 순으로 반환한다. */
export function getAllConceptDocuments(): ConceptDocument[] {
  return [...loadContentRepository().conceptDocuments].sort((first, second) =>
    compareConceptsByOrder(first.metadata, second.metadata),
  );
}

export function getAllConceptMetadata(): ConceptMetadata[] {
  return getAllConceptDocuments().map((conceptDocument) => conceptDocument.metadata);
}

export function getConceptDocumentBySlug(slug: string): ConceptDocument | undefined {
  return getAllConceptDocuments().find((conceptDocument) => conceptDocument.metadata.slug === slug);
}

export function getConceptMetadataBySlug(slug: string): ConceptMetadata | undefined {
  return getConceptDocumentBySlug(slug)?.metadata;
}

/**
 * slug 목록을 개념 메타데이터 목록으로 바꾼다.
 * 존재하지 않거나 숨겨진(초안) slug는 조용히 건너뛴다 — 검증 단계에서 이미 보고되었다.
 */
export function resolveConceptSlugs(conceptSlugs: string[]): ConceptMetadata[] {
  return conceptSlugs
    .map((conceptSlug) => getConceptMetadataBySlug(conceptSlug))
    .filter((concept): concept is ConceptMetadata => concept !== undefined);
}

/** 카테고리 정의 순서대로, 개념이 하나 이상 있는 카테고리만 반환한다. */
export function getUsedConceptCategories(): ConceptCategory[] {
  const usedCategories = new Set(getAllConceptMetadata().flatMap((concept) => concept.category));
  return conceptCategories.filter((category) => usedCategories.has(category));
}

export type ConceptRelation = {
  sourceSlug: string;
  targetSlug: string;
};

/**
 * 모든 개념의 related를 방향 없는 연결로 모은다 (A→B와 B→A는 하나로 본다).
 * 개념 지도(/map)에서 사용한다.
 */
export function getAllConceptRelations(): ConceptRelation[] {
  const visibleSlugs = new Set(getAllConceptMetadata().map((concept) => concept.slug));
  const relationKeys = new Set<string>();
  const relations: ConceptRelation[] = [];

  for (const concept of getAllConceptMetadata()) {
    for (const relatedSlug of concept.related) {
      if (!visibleSlugs.has(relatedSlug)) continue;
      const [sourceSlug, targetSlug] = [concept.slug, relatedSlug].sort();
      const relationKey = `${sourceSlug}::${targetSlug}`;
      if (relationKeys.has(relationKey)) continue;
      relationKeys.add(relationKey);
      relations.push({ sourceSlug, targetSlug });
    }
  }

  return relations;
}
