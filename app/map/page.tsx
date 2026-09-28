import Link from "next/link";

import { PageIntroduction } from "@/components/layout/PageIntroduction";
import { ConceptGraph } from "@/components/map/ConceptGraph";
import { getAllConceptMetadata, getAllConceptRelations, resolveConceptSlugs } from "@/lib/content/concepts";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "개념 지도",
  description: "연기, 무상, 무아, 사성제, 팔정도, 육바라밀… 불교 개념들이 서로 어떻게 이어져 있는지 한눈에 살펴봅니다.",
  path: "/map",
});

export default function ConceptMapPage() {
  const concepts = getAllConceptMetadata();
  const conceptRelations = getAllConceptRelations();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
      <PageIntroduction title="개념 지도">
        <p>
          각 개념 문서에 적힌 &lsquo;관련 개념&rsquo;을 선으로 이었습니다. 원을 누르면 해당 개념으로 이동합니다.
        </p>
      </PageIntroduction>

      <div className="mt-8 rounded-2xl border border-border bg-surface px-2 py-6 sm:px-6">
        <ConceptGraph
          nodes={concepts.map((concept) => ({ slug: concept.slug, title: concept.title, hanja: concept.hanja }))}
          relations={conceptRelations}
        />
      </div>

      <section aria-labelledby="concept-relations-heading" className="mt-12">
        <h2 id="concept-relations-heading" className="text-xl font-bold">
          개념별 연결 목록
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {concepts.map((concept) => (
            <li key={concept.slug} className="rounded-xl border border-border px-5 py-4">
              <Link href={`/concepts/${concept.slug}`} className="font-semibold hover:text-accent">
                {concept.title}
              </Link>
              <p className="mt-1 text-sm text-muted">
                <span className="sr-only">연결된 개념: </span>
                {resolveConceptSlugs(concept.related).map((relatedConcept, relatedIndex) => (
                  <span key={relatedConcept.slug}>
                    {relatedIndex > 0 ? ", " : ""}
                    <Link href={`/concepts/${relatedConcept.slug}`} className="underline-offset-2 hover:text-foreground hover:underline">
                      {relatedConcept.title}
                    </Link>
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
