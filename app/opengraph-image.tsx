import { openGraphImageSize, renderOpenGraphImage } from "@/lib/og/render-open-graph-image";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — 불교의 어려운 개념을 일상의 언어로`;
export const size = openGraphImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOpenGraphImage({
    eyebrow: "불교 지식 지도",
    title: siteConfig.name,
    subtitle: siteConfig.englishName,
    description: "불교의 어려운 개념을 일상의 언어로 이해해 보세요.",
  });
}
