import type { Metadata } from "next";

import { siteConfig } from "./site";

const defaultOpenGraphImagePath = "/opengraph-image";

type PageMetadataInput = {
  /** 페이지 제목. 레이아웃의 템플릿에 따라 "제목 | 법의 지도"로 표시된다. */
  title: string;
  description: string;
  /** 사이트 기준 경로. canonical URL과 OpenGraph URL에 쓰인다. 예: "/concepts/non-self" */
  path: string;
  openGraphType?: "website" | "article";
  /** 페이지 전용 OpenGraph 이미지 경로. 생략하면 사이트 대표 이미지를 쓴다. */
  openGraphImagePath?: string;
};

/**
 * 페이지별 SEO 메타데이터 (canonical, OpenGraph, Twitter card).
 * Next.js는 openGraph를 부모와 병합하지 않고 통째로 덮어쓰므로 공통 값을 매번 함께 넣는다.
 * 여기서 지정한 이미지가 경로별 opengraph-image 파일보다 우선하므로,
 * 전용 이미지가 있는 페이지(예: 개념 문서)는 openGraphImagePath로 그 경로를 넘긴다.
 */
export function createPageMetadata({
  title,
  description,
  path,
  openGraphType = "website",
  openGraphImagePath = defaultOpenGraphImagePath,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: openGraphType,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [openGraphImagePath],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [openGraphImagePath],
    },
  };
}
