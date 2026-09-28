import type { z } from "zod";

import type {
  conceptFrontmatterSchema,
  learningPathSchema,
  topicFrontmatterSchema,
} from "@/lib/content/schemas";

/** 개념 frontmatter. 스키마(lib/content/schemas.ts)에서 타입을 유도해 둘이 어긋나지 않게 한다. */
export type ConceptMetadata = z.infer<typeof conceptFrontmatterSchema>;

export type TopicMetadata = z.infer<typeof topicFrontmatterSchema>;

export type LearningPath = z.infer<typeof learningPathSchema>;

export type ConceptCategory = ConceptMetadata["category"][number];

export type ConceptDifficulty = NonNullable<ConceptMetadata["difficulty"]>;

/** frontmatter와 MDX 본문(frontmatter 제외)을 함께 담은 문서. */
export type ContentDocument<Metadata> = {
  metadata: Metadata;
  mdxBody: string;
  sourceFilePath: string;
};

export type ConceptDocument = ContentDocument<ConceptMetadata>;

export type TopicDocument = ContentDocument<TopicMetadata>;

/** 문서 안 목차 항목 (h2, h3). */
export type TableOfContentsHeading = {
  id: string;
  text: string;
  depth: 2 | 3;
};

/** 검색 인덱스 항목. 본문은 포함하지 않는다 (base_spec 65절). */
export type SearchIndexEntry = {
  type: "concept" | "topic";
  slug: string;
  href: string;
  title: string;
  summary: string;
  hanja?: string;
  english?: string;
  sanskrit?: string;
  pali?: string;
  aliases: string[];
  tags: string[];
};
