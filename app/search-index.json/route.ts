import { buildSearchIndex } from "@/lib/content/search-index";

/** 빌드 시 정적 JSON으로 생성되는 검색 인덱스. 검색창을 처음 열 때 한 번만 불러온다. */
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex());
}
