import { difficultyLabels } from "@/lib/content/taxonomy";
import type { ConceptMetadata } from "@/types/content";

import { DraftBadge } from "./DraftBadge";

type ConceptHeaderProps = {
  concept: ConceptMetadata;
};

/** 개념 문서 제목 영역: 제목 → 한자 / 영어 → 산스크리트어·팔리어 → 분류 (base_spec 14절). */
export function ConceptHeader({ concept }: ConceptHeaderProps) {
  const originalLanguageNames = [
    concept.sanskrit ? { label: "산스크리트어", value: concept.sanskrit, languageCode: "sa" } : null,
    concept.pali ? { label: "팔리어", value: concept.pali, languageCode: "pi" } : null,
  ].filter((originalLanguageName) => originalLanguageName !== null);

  return (
    <header className="mt-6">
      <h1 className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-4xl font-bold tracking-tight sm:text-5xl">{concept.title}</span>
        {concept.hanja ? (
          <span className="hanja text-2xl font-normal text-muted sm:text-3xl">{concept.hanja}</span>
        ) : null}
      </h1>
      {concept.english ? (
        <p lang="en" className="mt-2 text-lg text-muted">
          {concept.english}
        </p>
      ) : null}

      {originalLanguageNames.length > 0 ? (
        <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          {originalLanguageNames.map((originalLanguageName) => (
            <div key={originalLanguageName.label} className="flex gap-1.5">
              <dt>{originalLanguageName.label}</dt>
              <dd lang={originalLanguageName.languageCode} className="italic text-foreground">
                {originalLanguageName.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        {concept.draft ? <DraftBadge /> : null}
        {concept.category.map((category) => (
          <span key={category} className="rounded-full border border-border px-2.5 py-1 text-muted">
            {category}
          </span>
        ))}
        {concept.difficulty ? (
          <span className="rounded-full bg-surface px-2.5 py-1 text-muted">
            난이도 · {difficultyLabels[concept.difficulty]}
          </span>
        ) : null}
      </div>
    </header>
  );
}
