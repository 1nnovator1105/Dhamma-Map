import type { ConceptDocument, LearningPath, TopicDocument } from "@/types/content";

export type ContentProblem = {
  severity: "error" | "warning";
  location: string;
  message: string;
};

type ContentRelationInput = {
  conceptDocuments: ConceptDocument[];
  topicDocuments: TopicDocument[];
  learningPaths: LearningPath[];
};

/**
 * 문서 사이의 연결(related, 학습 경로)이 올바른지 검사한다 (base_spec 63·64절).
 * - error: 존재하지 않는 slug, 자기 자신 참조 → production 빌드를 실패시킨다.
 * - warning: 초안(draft) 문서를 참조 → production에서는 해당 연결만 숨겨진다.
 */
export function findContentRelationProblems({
  conceptDocuments,
  topicDocuments,
  learningPaths,
}: ContentRelationInput): ContentProblem[] {
  const problems: ContentProblem[] = [];
  const conceptsBySlug = new Map(
    conceptDocuments.map((conceptDocument) => [conceptDocument.metadata.slug, conceptDocument]),
  );

  function checkConceptReference(location: string, referencedSlug: string) {
    const referencedConcept = conceptsBySlug.get(referencedSlug);
    if (!referencedConcept) {
      problems.push({
        severity: "error",
        location,
        message: `존재하지 않는 개념 slug "${referencedSlug}"를 참조합니다.`,
      });
      return;
    }
    if (referencedConcept.metadata.draft) {
      problems.push({
        severity: "warning",
        location,
        message: `초안(draft) 개념 "${referencedSlug}"를 참조합니다. production에서는 이 연결이 표시되지 않습니다.`,
      });
    }
  }

  function checkDuplicateReferences(location: string, referencedSlugs: string[]) {
    const duplicatedSlugs = referencedSlugs.filter(
      (slug, position) => referencedSlugs.indexOf(slug) !== position,
    );
    for (const duplicatedSlug of new Set(duplicatedSlugs)) {
      problems.push({
        severity: "warning",
        location,
        message: `"${duplicatedSlug}"가 중복으로 나열되어 있습니다.`,
      });
    }
  }

  for (const conceptDocument of conceptDocuments) {
    const { slug, related } = conceptDocument.metadata;
    const location = conceptDocument.sourceFilePath;
    checkDuplicateReferences(location, related);
    for (const relatedSlug of related) {
      if (relatedSlug === slug) {
        problems.push({ severity: "error", location, message: "related에 자기 자신을 넣을 수 없습니다." });
        continue;
      }
      checkConceptReference(location, relatedSlug);
    }
  }

  for (const topicDocument of topicDocuments) {
    const location = topicDocument.sourceFilePath;
    checkDuplicateReferences(location, topicDocument.metadata.related);
    for (const relatedSlug of topicDocument.metadata.related) {
      checkConceptReference(location, relatedSlug);
    }
  }

  for (const learningPath of learningPaths) {
    const location = `content/learning-paths.json (${learningPath.slug})`;
    checkDuplicateReferences(location, learningPath.conceptSlugs);
    for (const conceptSlug of learningPath.conceptSlugs) {
      checkConceptReference(location, conceptSlug);
    }
  }

  return problems;
}

export function formatContentProblems(problems: ContentProblem[]): string {
  return problems
    .map((problem) => `  [${problem.severity}] ${problem.location}: ${problem.message}`)
    .join("\n");
}
