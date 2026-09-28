import type { ReactNode } from "react";

import type { TableOfContentsHeading } from "@/types/content";

import { CollapsibleTableOfContents, DesktopTableOfContents } from "./TableOfContents";

type ArticleLayoutProps = {
  /** 문서 제목 영역 (breadcrumb, 제목, 원어 표기 등) */
  header: ReactNode;
  /** 왼쪽 탐색 영역. 넓은 화면(lg 이상)에서만 보인다. */
  sidebar?: ReactNode;
  tableOfContents: TableOfContentsHeading[];
  children: ReactNode;
};

/**
 * 문서 페이지 3단 레이아웃 (base_spec 35절).
 * 탐색 | 본문 | 목차 — 화면이 좁아지면 목차는 본문 위 접이식으로, 탐색은 숨긴다.
 * 본문 텍스트 폭은 약 720px로 제한한다.
 */
export function ArticleLayout({ header, sidebar, tableOfContents, children }: ArticleLayoutProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[180px_minmax(0,1fr)_200px]">
      {sidebar ? <aside className="hidden lg:block">{sidebar}</aside> : <div className="hidden lg:block" />}

      <article className="mx-auto w-full max-w-[720px] min-w-0">
        {header}
        <div className="mt-6 xl:hidden">
          <CollapsibleTableOfContents headings={tableOfContents} />
        </div>
        <div className="article-body mt-8">{children}</div>
      </article>

      <aside className="hidden xl:block">
        <DesktopTableOfContents headings={tableOfContents} />
      </aside>
    </div>
  );
}
