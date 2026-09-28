"use client";

import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useId, useRef, useState, type KeyboardEvent } from "react";

import { findSearchResults } from "@/lib/search/find-search-results";
import type { SearchIndexEntry } from "@/types/content";

import { SearchIcon } from "./SearchIcon";
import { openSiteSearchEventName } from "./site-search-events";

const suggestedQueries = ["사성제", "연기", "무상", "무아", "無我", "non-self"];

type SearchIndexLoadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "loaded"; searchIndex: SearchIndexEntry[] }
  | { status: "failed" };

/**
 * 헤더의 검색 버튼과 검색 대화상자.
 * 검색 인덱스는 대화상자를 처음 열 때 /search-index.json 에서 한 번만 불러온다.
 * 단축키: ⌘K / Ctrl+K, 또는 입력 중이 아닐 때 "/".
 */
export function SiteSearchDialog() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultListId = useId();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeResultIndex, setActiveResultIndex] = useState(0);
  const [searchIndexLoadState, setSearchIndexLoadState] = useState<SearchIndexLoadState>({
    status: "idle",
  });

  const searchResults =
    searchIndexLoadState.status === "loaded"
      ? findSearchResults(searchIndexLoadState.searchIndex, searchQuery)
      : [];

  async function loadSearchIndex() {
    setSearchIndexLoadState({ status: "loading" });
    try {
      const response = await fetch("/search-index.json");
      if (!response.ok) throw new Error(`검색 인덱스 응답 오류: ${response.status}`);
      const searchIndex: SearchIndexEntry[] = await response.json();
      setSearchIndexLoadState({ status: "loaded", searchIndex });
    } catch {
      setSearchIndexLoadState({ status: "failed" });
    }
  }

  function openDialog() {
    const dialogElement = dialogRef.current;
    if (!dialogElement || dialogElement.open) return;
    dialogElement.showModal();
    searchInputRef.current?.select();
    if (searchIndexLoadState.status === "idle" || searchIndexLoadState.status === "failed") {
      void loadSearchIndex();
    }
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function navigateToResult(searchResult: SearchIndexEntry) {
    closeDialog();
    setSearchQuery("");
    router.push(searchResult.href);
  }

  function updateSearchQuery(nextSearchQuery: string) {
    setSearchQuery(nextSearchQuery);
    setActiveResultIndex(0);
  }

  function handleSearchInputKeyDown(keyboardEvent: KeyboardEvent<HTMLInputElement>) {
    // 한글 조합 중의 Enter·방향키는 조합을 끝내는 입력이므로 무시한다
    if (keyboardEvent.nativeEvent.isComposing) return;

    if (keyboardEvent.key === "ArrowDown" && searchResults.length > 0) {
      keyboardEvent.preventDefault();
      setActiveResultIndex((currentIndex) => (currentIndex + 1) % searchResults.length);
    } else if (keyboardEvent.key === "ArrowUp" && searchResults.length > 0) {
      keyboardEvent.preventDefault();
      setActiveResultIndex(
        (currentIndex) => (currentIndex - 1 + searchResults.length) % searchResults.length,
      );
    } else if (keyboardEvent.key === "Enter") {
      const activeResult = searchResults[activeResultIndex];
      if (activeResult) {
        keyboardEvent.preventDefault();
        navigateToResult(activeResult);
      }
    }
  }

  const openDialogFromOutside = useEffectEvent(() => openDialog());

  useEffect(() => {
    function handleGlobalKeyDown(keyboardEvent: globalThis.KeyboardEvent) {
      const isShortcutWithModifier =
        (keyboardEvent.metaKey || keyboardEvent.ctrlKey) && keyboardEvent.key.toLowerCase() === "k";
      const focusedElement = document.activeElement;
      const isTypingInField =
        focusedElement instanceof HTMLInputElement ||
        focusedElement instanceof HTMLTextAreaElement ||
        (focusedElement instanceof HTMLElement && focusedElement.isContentEditable);
      const isSlashShortcut = keyboardEvent.key === "/" && !isTypingInField;

      if (isShortcutWithModifier || isSlashShortcut) {
        keyboardEvent.preventDefault();
        openDialogFromOutside();
      }
    }
    function handleOpenSearchRequest() {
      openDialogFromOutside();
    }

    window.addEventListener("keydown", handleGlobalKeyDown);
    window.addEventListener(openSiteSearchEventName, handleOpenSearchRequest);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
      window.removeEventListener(openSiteSearchEventName, handleOpenSearchRequest);
    };
  }, []);

  const activeResult = searchResults[activeResultIndex];
  const hasQuery = searchQuery.trim().length > 0;

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        aria-keyshortcuts="Meta+K Control+K /"
        aria-haspopup="dialog"
        className="flex items-center gap-2 rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
      >
        <SearchIcon />
        <span className="hidden sm:inline">검색</span>
        <span className="sr-only sm:hidden">검색</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="개념 검색"
        onClick={(mouseEvent) => {
          // 대화상자 바깥(배경)을 누르면 닫는다
          if (mouseEvent.target === dialogRef.current) closeDialog();
        }}
        className="m-0 mx-auto mt-[8vh] w-[calc(100%-2rem)] max-w-xl rounded-2xl border border-border bg-surface-raised p-0 text-foreground shadow-xl backdrop:bg-black/40"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <SearchIcon className="size-5 shrink-0 text-muted" />
          <input
            ref={searchInputRef}
            type="search"
            role="combobox"
            aria-expanded={searchResults.length > 0}
            aria-controls={resultListId}
            aria-activedescendant={activeResult ? `${resultListId}-${activeResult.slug}` : undefined}
            aria-autocomplete="list"
            aria-label="검색어"
            placeholder="사성제, 무아, 연기..."
            value={searchQuery}
            onChange={(changeEvent) => updateSearchQuery(changeEvent.target.value)}
            onKeyDown={handleSearchInputKeyDown}
            autoComplete="off"
            spellCheck={false}
            className="h-14 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
          />
          <button
            type="button"
            onClick={closeDialog}
            className="rounded-md px-2 py-1 text-sm text-muted hover:text-foreground"
          >
            닫기
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {searchIndexLoadState.status === "failed" ? (
            <p className="px-3 py-6 text-center text-sm text-muted">
              검색 목록을 불러오지 못했습니다. 잠시 후 다시 열어 주세요.
            </p>
          ) : null}

          {!hasQuery && searchIndexLoadState.status !== "failed" ? (
            <div className="px-3 py-4">
              <p className="text-sm text-muted">한글, 한자, 영어로 찾을 수 있어요.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestedQueries.map((suggestedQuery) => (
                  <button
                    key={suggestedQuery}
                    type="button"
                    onClick={() => {
                      updateSearchQuery(suggestedQuery);
                      searchInputRef.current?.focus();
                    }}
                    className="rounded-full border border-border px-3 py-1 text-sm hover:border-accent hover:text-accent"
                  >
                    {suggestedQuery}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {hasQuery && searchIndexLoadState.status === "loaded" && searchResults.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted">
              &lsquo;{searchQuery}&rsquo;에 맞는 개념을 찾지 못했어요.
            </p>
          ) : null}

          <ul id={resultListId} role="listbox" aria-label="검색 결과">
            {searchResults.map((searchResult, resultIndex) => {
              const isActive = resultIndex === activeResultIndex;
              return (
                <li
                  key={searchResult.href}
                  id={`${resultListId}-${searchResult.slug}`}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => navigateToResult(searchResult)}
                  onMouseMove={() => setActiveResultIndex(resultIndex)}
                  className={`cursor-pointer rounded-xl px-3 py-3 ${isActive ? "bg-accent-soft" : ""}`}
                >
                  <p className="flex items-baseline gap-2">
                    <span className="font-semibold">{searchResult.title}</span>
                    {searchResult.hanja ? (
                      <span className="hanja text-sm text-muted">{searchResult.hanja}</span>
                    ) : null}
                    {searchResult.type === "topic" ? (
                      <span className="rounded bg-surface px-1.5 py-0.5 text-xs text-muted">주제</span>
                    ) : null}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-sm leading-relaxed text-muted">
                    {searchResult.summary}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </dialog>
    </>
  );
}
