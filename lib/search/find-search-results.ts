import type { SearchIndexEntry } from "@/types/content";

/**
 * 검색어와 대상 문자열을 같은 형태로 맞춘다.
 * - 대소문자, 공백, 하이픈, 가운뎃점 차이를 무시한다 ("non self" ↔ "Non-self")
 * - 팔리어·산스크리트어 발음 기호를 무시한다 ("anatta" ↔ "anattā")
 */
export function normalizeSearchText(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .normalize("NFC")
    .toLowerCase()
    .replace(/[\s\-·‧_'"‘’“”]/g, "");
}

type WeightedSearchField = {
  values: string[];
  exactMatchScore: number;
  prefixMatchScore: number;
  partialMatchScore: number;
};

function describeSearchFields(entry: SearchIndexEntry): WeightedSearchField[] {
  const originalLanguageNames = [entry.hanja, entry.english, entry.sanskrit, entry.pali].filter(
    (value): value is string => Boolean(value),
  );
  return [
    { values: [entry.title], exactMatchScore: 100, prefixMatchScore: 80, partialMatchScore: 60 },
    { values: entry.aliases, exactMatchScore: 90, prefixMatchScore: 60, partialMatchScore: 45 },
    { values: originalLanguageNames, exactMatchScore: 90, prefixMatchScore: 60, partialMatchScore: 45 },
    { values: entry.tags, exactMatchScore: 50, prefixMatchScore: 35, partialMatchScore: 25 },
    { values: [entry.summary], exactMatchScore: 20, prefixMatchScore: 20, partialMatchScore: 15 },
  ];
}

function scoreSearchEntry(entry: SearchIndexEntry, normalizedQuery: string): number {
  let bestScore = 0;
  for (const searchField of describeSearchFields(entry)) {
    for (const fieldValue of searchField.values) {
      const normalizedValue = normalizeSearchText(fieldValue);
      if (normalizedValue === normalizedQuery) {
        bestScore = Math.max(bestScore, searchField.exactMatchScore);
      } else if (normalizedValue.startsWith(normalizedQuery)) {
        bestScore = Math.max(bestScore, searchField.prefixMatchScore);
      } else if (normalizedValue.includes(normalizedQuery)) {
        bestScore = Math.max(bestScore, searchField.partialMatchScore);
      }
    }
  }
  // 같은 점수라면 주제 글보다 개념 문서를 먼저 보여준다
  return bestScore > 0 && entry.type === "concept" ? bestScore + 1 : bestScore;
}

/** 제목·별칭·한자·영문·태그·요약을 대상으로 점수가 높은 순서로 결과를 돌려준다. */
export function findSearchResults(
  searchIndex: SearchIndexEntry[],
  query: string,
  maximumResultCount = 8,
): SearchIndexEntry[] {
  const normalizedQuery = normalizeSearchText(query);
  if (normalizedQuery.length === 0) return [];

  return searchIndex
    .map((entry) => ({ entry, score: scoreSearchEntry(entry, normalizedQuery) }))
    .filter((scoredEntry) => scoredEntry.score > 0)
    .sort((first, second) => second.score - first.score)
    .slice(0, maximumResultCount)
    .map((scoredEntry) => scoredEntry.entry);
}
