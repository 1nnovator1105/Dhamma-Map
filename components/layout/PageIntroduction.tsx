import type { ReactNode } from "react";

type PageIntroductionProps = {
  title: string;
  children?: ReactNode;
};

/** 목록형 페이지(개념, 주제, 지도, 소개) 상단의 제목과 안내 문구. */
export function PageIntroduction({ title, children }: PageIntroductionProps) {
  return (
    <header className="max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {children ? <div className="mt-3 text-lg leading-relaxed text-muted">{children}</div> : null}
    </header>
  );
}
