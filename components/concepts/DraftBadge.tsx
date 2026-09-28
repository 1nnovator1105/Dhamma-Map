/** 개발 환경에서만 보이는 초안 표시. production에서는 초안 문서 자체가 제외된다. */
export function DraftBadge() {
  return (
    <span className="rounded-full bg-caution-soft px-2.5 py-1 text-xs font-semibold text-caution">
      초안 · 공개되지 않음
    </span>
  );
}
