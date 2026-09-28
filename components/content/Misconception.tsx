type MisconceptionProps = {
  wrong: string;
  right: string;
};

/**
 * 흔한 오해와 실제 의미를 나란히 보여준다 (base_spec 21절).
 * 색상만으로 구분하지 않도록 '흔한 오해'·'실제로는' 텍스트 라벨과 기호를 함께 쓴다.
 */
export function Misconception({ wrong, right }: MisconceptionProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="bg-caution-soft px-5 py-4">
        <p className="text-sm font-semibold text-caution">
          <span aria-hidden="true">✕ </span>흔한 오해
        </p>
        <p className="mt-1 leading-relaxed">{wrong}</p>
      </div>
      <div className="bg-affirm-soft px-5 py-4">
        <p className="text-sm font-semibold text-affirm">
          <span aria-hidden="true">✓ </span>실제로는
        </p>
        <p className="mt-1 leading-relaxed">{right}</p>
      </div>
    </div>
  );
}
