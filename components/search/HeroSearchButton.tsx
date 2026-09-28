"use client";

import { SearchIcon } from "./SearchIcon";
import { openSiteSearch } from "./site-search-events";

/** 홈 화면의 큰 검색 입력처럼 보이는 버튼. 누르면 헤더의 검색 대화상자를 연다. */
export function HeroSearchButton() {
  return (
    <button
      type="button"
      onClick={openSiteSearch}
      aria-haspopup="dialog"
      className="flex w-full max-w-md items-center gap-3 rounded-xl border border-border-strong bg-surface-raised px-4 py-3.5 text-left text-muted shadow-sm transition-colors hover:border-accent"
    >
      <SearchIcon className="size-5 shrink-0" />
      <span className="flex-1">사성제, 무아, 연기...</span>
      <span className="sr-only">개념 검색 열기</span>
    </button>
  );
}
