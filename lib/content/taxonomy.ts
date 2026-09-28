/**
 * 개념 분류 체계. 콘텐츠가 늘면 여기서 카테고리를 추가·변경한다 (base_spec 16절).
 * frontmatter의 category 값은 이 목록 중 하나여야 하며, 빌드 시 검증된다.
 */
export const conceptCategories = [
  "핵심 교리",
  "수행",
  "윤리",
  "마음",
  "지혜",
  "대승불교",
  "불교 용어",
] as const;

export const conceptDifficulties = ["beginner", "intermediate", "advanced"] as const;

export const difficultyLabels: Record<(typeof conceptDifficulties)[number], string> = {
  beginner: "입문",
  intermediate: "중급",
  advanced: "심화",
};
