"use client";

import Link from "next/link";
import { useState } from "react";

import { difficultyLabels } from "@/lib/content/taxonomy";
import type { ConceptCategory, ConceptDifficulty, ConceptMetadata } from "@/types/content";

export type ConceptDirectoryItem = Pick<
  ConceptMetadata,
  "slug" | "title" | "hanja" | "english" | "summary" | "category" | "difficulty" | "draft"
>;

type ConceptDirectoryProps = {
  concepts: ConceptDirectoryItem[];
  categories: ConceptCategory[];
  difficulties: ConceptDifficulty[];
};

type FilterButtonProps = {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
};

function FilterButton({ label, isSelected, onSelect }: FilterButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onSelect}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        isSelected
          ? "border-accent bg-accent text-accent-contrast"
          : "border-border text-muted hover:border-border-strong hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

/** 전체 개념 목록과 단순한 카테고리·난이도 필터 (base_spec 51절). */
export function ConceptDirectory({ concepts, categories, difficulties }: ConceptDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<ConceptCategory | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<ConceptDifficulty | null>(null);

  const filteredConcepts = concepts.filter(
    (concept) =>
      (selectedCategory === null || concept.category.includes(selectedCategory)) &&
      (selectedDifficulty === null || concept.difficulty === selectedDifficulty),
  );

  return (
    <div>
      <div className="space-y-3">
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="sr-only">카테고리</legend>
          <span aria-hidden="true" className="mr-1 w-12 shrink-0 text-sm font-semibold text-muted">
            분류
          </span>
          <FilterButton label="전체" isSelected={selectedCategory === null} onSelect={() => setSelectedCategory(null)} />
          {categories.map((category) => (
            <FilterButton
              key={category}
              label={category}
              isSelected={selectedCategory === category}
              onSelect={() => setSelectedCategory(category)}
            />
          ))}
        </fieldset>

        {difficulties.length > 1 ? (
          <fieldset className="flex flex-wrap items-center gap-2">
            <legend className="sr-only">난이도</legend>
            <span aria-hidden="true" className="mr-1 w-12 shrink-0 text-sm font-semibold text-muted">
              난이도
            </span>
            <FilterButton
              label="전체"
              isSelected={selectedDifficulty === null}
              onSelect={() => setSelectedDifficulty(null)}
            />
            {difficulties.map((difficulty) => (
              <FilterButton
                key={difficulty}
                label={difficultyLabels[difficulty]}
                isSelected={selectedDifficulty === difficulty}
                onSelect={() => setSelectedDifficulty(difficulty)}
              />
            ))}
          </fieldset>
        ) : null}
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {filteredConcepts.length}개의 개념
      </p>

      <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredConcepts.map((concept) => (
          <li key={concept.slug}>
            <Link
              href={`/concepts/${concept.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface-raised px-5 py-5 transition-colors hover:border-accent"
            >
              <span className="flex items-baseline gap-2">
                <span className="text-xl font-semibold group-hover:text-accent">{concept.title}</span>
                {concept.hanja ? <span className="hanja text-muted">{concept.hanja}</span> : null}
              </span>
              {concept.english ? (
                <span lang="en" className="mt-0.5 text-sm text-muted">
                  {concept.english}
                </span>
              ) : null}
              <span className="mt-3 flex-1 text-[0.9375rem] leading-relaxed">{concept.summary}</span>
              <span className="mt-4 flex flex-wrap gap-1.5 text-xs text-muted">
                {concept.draft ? (
                  <span className="rounded-full bg-caution-soft px-2 py-0.5 font-semibold text-caution">초안</span>
                ) : null}
                {concept.category.map((category) => (
                  <span key={category} className="rounded-full border border-border px-2 py-0.5">
                    {category}
                  </span>
                ))}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {filteredConcepts.length === 0 ? (
        <p className="mt-6 rounded-xl bg-surface px-5 py-6 text-center text-muted">
          조건에 맞는 개념이 아직 없습니다. 다른 분류를 선택해 보세요.
        </p>
      ) : null}
    </div>
  );
}
