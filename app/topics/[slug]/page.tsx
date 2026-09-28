import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DraftBadge } from "@/components/concepts/DraftBadge";
import { createMdxComponents } from "@/components/content/mdx-components";
import { ArticleLayout } from "@/components/layout/ArticleLayout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DocumentSidebar } from "@/components/layout/DocumentSidebar";
import { compileMdxDocument } from "@/lib/content/mdx";
import { getAllTopicMetadata, getTopicDocumentBySlug } from "@/lib/content/topics";
import { createPageMetadata } from "@/lib/page-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTopicMetadata().map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: PageProps<"/topics/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const topicDocument = getTopicDocumentBySlug(slug);
  if (!topicDocument) return {};

  return createPageMetadata({
    title: topicDocument.metadata.title,
    description: topicDocument.metadata.summary,
    path: `/topics/${slug}`,
    openGraphType: "article",
  });
}

export default async function TopicPage({ params }: PageProps<"/topics/[slug]">) {
  const { slug } = await params;
  const topicDocument = getTopicDocumentBySlug(slug);
  if (!topicDocument) notFound();

  const topic = topicDocument.metadata;
  const { MdxContent, tableOfContents } = await compileMdxDocument(topicDocument.mdxBody);
  const mdxComponents = createMdxComponents({ relatedConceptSlugs: topic.related });

  return (
    <ArticleLayout
      sidebar={
        <DocumentSidebar
          heading={{ label: "주제로 보기", href: "/topics" }}
          currentHref={`/topics/${topic.slug}`}
          items={getAllTopicMetadata().map((sidebarTopic) => ({
            href: `/topics/${sidebarTopic.slug}`,
            label: sidebarTopic.title,
          }))}
        />
      }
      tableOfContents={tableOfContents}
      header={
        <>
          <Breadcrumb items={[{ label: "주제로 보기", href: "/topics" }, { label: topic.title }]} />
          <header className="mt-6">
            {topic.draft ? (
              <div className="mb-3">
                <DraftBadge />
              </div>
            ) : null}
            <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">{topic.title}</h1>
          </header>
        </>
      }
    >
      <MdxContent components={mdxComponents} />
    </ArticleLayout>
  );
}
