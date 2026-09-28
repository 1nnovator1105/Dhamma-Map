type ConditionStatement = {
  condition: string;
  consequence: string;
};

type ConditionDirection = {
  label: string;
  description: string;
  statements: ConditionStatement[];
};

const conditionDirections: ConditionDirection[] = [
  {
    label: "생겨나는 방향",
    description: "조건이 갖춰지면 결과가 나타납니다.",
    statements: [
      { condition: "이것이 있으면", consequence: "저것이 있고" },
      { condition: "이것이 생기면", consequence: "저것이 생긴다" },
    ],
  },
  {
    label: "사라지는 방향",
    description: "조건이 사라지면 결과도 사라집니다.",
    statements: [
      { condition: "이것이 없으면", consequence: "저것이 없고" },
      { condition: "이것이 사라지면", consequence: "저것이 사라진다" },
    ],
  },
];

/** 연기의 기본 정형구를 '생겨나는 방향'과 '사라지는 방향' 두 갈래로 보여준다. */
export function DependentOriginationDiagram() {
  return (
    <figure className="rounded-2xl border border-border bg-surface px-4 py-5 sm:px-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {conditionDirections.map((conditionDirection) => (
          <section
            key={conditionDirection.label}
            aria-label={conditionDirection.label}
            className="rounded-xl border border-border bg-surface-raised px-4 py-4"
          >
            <p className="font-semibold">{conditionDirection.label}</p>
            <p className="mt-0.5 text-sm text-muted">{conditionDirection.description}</p>
            <ul className="mt-3 space-y-2">
              {conditionDirection.statements.map((statement) => (
                <li key={statement.condition} className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="rounded-md bg-accent-soft px-2 py-0.5 text-[0.9375rem] font-medium text-accent">
                    {statement.condition}
                  </span>
                  <span aria-hidden="true" className="text-muted">
                    →
                  </span>
                  <span className="text-[0.9375rem]">{statement.consequence}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-muted">
        초기 경전에 여러 차례 나오는 연기의 기본 정형구입니다. 무엇이 &lsquo;조건&rsquo;이 되어 무엇이
        생겨나고 사라지는지를 살피는 것이 연기를 보는 방법입니다.
      </figcaption>
    </figure>
  );
}
