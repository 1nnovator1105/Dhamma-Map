import { ConceptDirectory } from "@/components/concepts/ConceptDirectory";
import { PageIntroduction } from "@/components/layout/PageIntroduction";
import { getAllConceptMetadata, getUsedConceptCategories } from "@/lib/content/concepts";
import { conceptDifficulties } from "@/lib/content/taxonomy";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "개념",
  description: "사성제, 팔정도, 연기, 무상, 무아, 육바라밀 등 불교의 핵심 개념을 쉬운 설명과 함께 모았습니다.",
  path: "/concepts",
});

export default function ConceptsPage() {
  const concepts = getAllConceptMetadata();
  const usedDifficulties = conceptDifficulties.filter((difficulty) =>
    concepts.some((concept) => concept.difficulty === difficulty),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
      <PageIntroduction title="개념">
        <p>불교의 핵심 개념을 하나씩 쉬운 말로 풀었습니다. 궁금한 개념부터 골라 읽어 보세요.</p>
      </PageIntroduction>

      <div className="mt-10">
        <ConceptDirectory
          concepts={concepts.map((concept) => ({
            slug: concept.slug,
            title: concept.title,
            hanja: concept.hanja,
            english: concept.english,
            summary: concept.summary,
            category: concept.category,
            difficulty: concept.difficulty,
            draft: concept.draft,
          }))}
          categories={getUsedConceptCategories()}
          difficulties={usedDifficulties}
        />
      </div>
    </div>
  );
}
