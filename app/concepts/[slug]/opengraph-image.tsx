import { getAllConceptMetadata, getConceptMetadataBySlug } from "@/lib/content/concepts";
import { openGraphImageSize, renderOpenGraphImage } from "@/lib/og/render-open-graph-image";

export const alt = "법의 지도 개념 설명";
export const size = openGraphImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllConceptMetadata().map((concept) => ({ slug: concept.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = getConceptMetadataBySlug(slug);

  return renderOpenGraphImage({
    eyebrow: "불교 개념",
    title: concept?.title ?? "법의 지도",
    subtitle: concept?.english,
    description: concept?.summary,
  });
}
