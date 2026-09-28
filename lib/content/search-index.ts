import "server-only";

import type { SearchIndexEntry } from "@/types/content";

import { getAllConceptMetadata } from "./concepts";
import { getAllTopicMetadata } from "./topics";

/**
 * 공개된 개념·주제 메타데이터로 검색 인덱스를 만든다 (base_spec 65절).
 * 초안은 production에서 이미 제외되어 있으므로 여기서 따로 거르지 않는다.
 */
export function buildSearchIndex(): SearchIndexEntry[] {
  const conceptEntries: SearchIndexEntry[] = getAllConceptMetadata().map((concept) => ({
    type: "concept",
    slug: concept.slug,
    href: `/concepts/${concept.slug}`,
    title: concept.title,
    summary: concept.summary,
    hanja: concept.hanja,
    english: concept.english,
    sanskrit: concept.sanskrit,
    pali: concept.pali,
    aliases: concept.aliases ?? [],
    tags: concept.tags ?? [],
  }));

  const topicEntries: SearchIndexEntry[] = getAllTopicMetadata().map((topic) => ({
    type: "topic",
    slug: topic.slug,
    href: `/topics/${topic.slug}`,
    title: topic.title,
    summary: topic.summary,
    aliases: [],
    tags: [],
  }));

  return [...conceptEntries, ...topicEntries];
}
