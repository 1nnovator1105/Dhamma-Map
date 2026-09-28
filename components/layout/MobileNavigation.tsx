"use client";

import { useEffect, useId, useState } from "react";

import { PrimaryNavigationLinks } from "./PrimaryNavigationLinks";

/** 모바일 전용 메뉴. 메뉴를 고르거나 Esc를 누르면 닫힌다. */
export function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuPanelId = useId();

  useEffect(() => {
    if (!isMenuOpen) return;
    function closeMenuOnEscape(keyboardEvent: KeyboardEvent) {
      if (keyboardEvent.key === "Escape") setIsMenuOpen(false);
    }
    window.addEventListener("keydown", closeMenuOnEscape);
    return () => window.removeEventListener("keydown", closeMenuOnEscape);
  }, [isMenuOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls={menuPanelId}
        onClick={() => setIsMenuOpen((wasOpen) => !wasOpen)}
        className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground"
      >
        <span className="sr-only">{isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}</span>
        <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          {isMenuOpen ? <path d="M5 5l10 10M15 5 5 15" /> : <path d="M3.5 6h13M3.5 10h13M3.5 14h13" />}
        </svg>
      </button>

      <nav
        id={menuPanelId}
        aria-label="모바일 메뉴"
        hidden={!isMenuOpen}
        className="absolute inset-x-0 top-full border-b border-border bg-background px-4 pt-2 pb-4 shadow-sm"
      >
        <PrimaryNavigationLinks orientation="vertical" onNavigate={() => setIsMenuOpen(false)} />
      </nav>
    </div>
  );
}
