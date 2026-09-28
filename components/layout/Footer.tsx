import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold text-foreground">
            {siteConfig.name} <span className="font-normal text-muted">{siteConfig.englishName}</span>
          </p>
          <p className="mt-1 max-w-md leading-relaxed">
            불교의 어려운 개념을 일상의 언어로 풀어 쓰는 교육용 지식 서비스입니다. 전통마다 해석이 다를
            수 있는 내용은 구분해 설명합니다.
          </p>
        </div>
        <nav aria-label="바닥글 메뉴">
          <ul className="flex gap-4">
            <li>
              <Link href="/about" className="hover:text-foreground">
                프로젝트 소개
              </Link>
            </li>
            <li>
              <Link href="/concepts" className="hover:text-foreground">
                전체 개념
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
