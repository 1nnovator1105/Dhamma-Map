import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ConceptHeader } from "@/components/concepts/ConceptHeader";
import { createMdxComponents } from "@/components/content/mdx-components";
import { ArticleLayout } from "@/components/layout/ArticleLayout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DocumentSidebar } from "@/components/layout/DocumentSidebar";
import { getAllConceptMetadata, getConceptDocumentBySlug } from "@/lib/content/concepts";
import { compileMdxDocument } from "@/lib/content/mdx";
import { attachParticle, selectParticle } from "@/lib/korean";
import { createPageMetadata } from "@/lib/page-metadata";

/** 빌드 때 만든 개념 외의 slug는 모두 404로 처리한다 (base_spec 63절). */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllConceptMetadata().map((concept) => ({ slug: concept.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/concepts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const conceptDocument = getConceptDocumentBySlug(slug);
  if (!conceptDocument) return {};

  const { title, hanja } = conceptDocument.metadata;
  // 조사는 괄호가 아니라 개념 이름의 받침을 따른다. 예: "무상(無常)을", "연기(緣起)를"
  const objectParticle = selectParticle(title, "을", "를");
  const titleWithHanja = hanja ? `${title}(${hanja})` : title;
  return createPageMetadata({
    // 예: "연기란 무엇인가?", "무상이란 무엇인가?"
    title: `${attachParticle(title, "이란", "란")} 무엇인가?`,
    description: `불교의 ${titleWithHanja}${objectParticle} 쉬운 설명과 일상의 예시로 알아봅니다. ${conceptDocument.metadata.summary}`,
    path: `/concepts/${slug}`,
    openGraphType: "article",
    openGraphImagePath: `/concepts/${slug}/opengraph-image`,
  });
}

export default async function ConceptPage({ params }: PageProps<"/concepts/[slug]">) {
  const { slug } = await params;
  const conceptDocument = getConceptDocumentBySlug(slug);
  if (!conceptDocument) notFound();

  const concept = conceptDocument.metadata;
  const { MdxContent, tableOfContents } = await compileMdxDocument(conceptDocument.mdxBody);
  const mdxComponents = createMdxComponents({ relatedConceptSlugs: concept.related });

  return (
    <ArticleLayout
      sidebar={
        <DocumentSidebar
          heading={{ label: "개념", href: "/concepts" }}
          currentHref={`/concepts/${concept.slug}`}
          items={getAllConceptMetadata().map((sidebarConcept) => ({
            href: `/concepts/${sidebarConcept.slug}`,
            label: sidebarConcept.title,
            secondaryLabel: sidebarConcept.hanja,
          }))}
        />
      }
      tableOfContents={tableOfContents}
      header={
        <>
          <Breadcrumb items={[{ label: "개념", href: "/concepts" }, { label: concept.title }]} />
          <ConceptHeader concept={concept} />
        </>
      }
    >
      <MdxContent components={mdxComponents} />
    </ArticleLayout>
  );
}
