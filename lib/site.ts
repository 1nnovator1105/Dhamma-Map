function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "법의 지도",
  englishName: "Dhamma Map",
  description:
    "사성제, 팔정도, 연기, 무상, 무아… 불교의 어려운 개념을 일상의 언어와 예시로 풀고, 개념 사이의 연결을 따라 탐색하는 불교 지식 지도입니다.",
  url: resolveSiteUrl(),
  locale: "ko_KR",
} as const;

export const primaryNavigationLinks = [
  { href: "/concepts", label: "개념" },
  { href: "/topics", label: "주제로 보기" },
  { href: "/map", label: "지도" },
] as const;
