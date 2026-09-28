import type { MetadataRoute } from "next";

import { getAllConceptMetadata } from "@/lib/content/concepts";
import { getAllTopicMetadata } from "@/lib/content/topics";
import { siteConfig } from "@/lib/site";

function toAbsoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

/** 정적 페이지와 공개된 모든 개념·주제 문서를 sitemap.xml로 내보낸다. 초안은 제외된다. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPagePaths = ["/", "/concepts", "/topics", "/map", "/about"];

  return [
    ...staticPagePaths.map((path) => ({
      url: toAbsoluteUrl(path),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.6,
    })),
    ...getAllConceptMetadata().map((concept) => ({
      url: toAbsoluteUrl(`/concepts/${concept.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getAllTopicMetadata().map((topic) => ({
      url: toAbsoluteUrl(`/topics/${topic.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
