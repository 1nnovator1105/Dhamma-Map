type Paramita = {
  name: string;
  hanja: string;
  sanskrit: string;
  plainName: string;
  description: string;
};

const paramitas: Paramita[] = [
  {
    name: "보시",
    hanja: "布施",
    sanskrit: "dāna",
    plainName: "나누기",
    description: "재물, 가르침, 안심을 대가를 바라지 않고 나눕니다.",
  },
  {
    name: "지계",
    hanja: "持戒",
    sanskrit: "śīla",
    plainName: "지켜야 할 것 지키기",
    description: "나와 남을 해치는 말과 행동을 삼갑니다.",
  },
  {
    name: "인욕",
    hanja: "忍辱",
    sanskrit: "kṣānti",
    plainName: "참고 받아들이기",
    description: "모욕이나 어려움 앞에서 성내지 않고 견딥니다.",
  },
  {
    name: "정진",
    hanja: "精進",
    sanskrit: "vīrya",
    plainName: "꾸준히 노력하기",
    description: "게으르지 않고 선한 일을 이어 갑니다.",
  },
  {
    name: "선정",
    hanja: "禪定",
    sanskrit: "dhyāna",
    plainName: "마음 모으기",
    description: "흩어진 마음을 고요하게 모읍니다.",
  },
  {
    name: "지혜",
    hanja: "智慧",
    sanskrit: "prajñā",
    plainName: "있는 그대로 보기",
    description: "모든 것이 조건에 따라 생겨나고, 고정된 실체가 없음을 꿰뚫어 봅니다.",
  },
];

/** 육바라밀 여섯 항목을 짧은 설명과 함께 보여준다 (base_spec 26절). */
export function SixParamitasDiagram() {
  return (
    <figure className="rounded-2xl border border-border bg-surface px-4 py-5 sm:px-6">
      <ol className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {paramitas.map((paramita, paramitaIndex) => {
          const isWisdom = paramitaIndex === paramitas.length - 1;
          return (
            <li
              key={paramita.name}
              className={`rounded-xl border bg-surface-raised px-4 py-4 ${
                isWisdom ? "border-accent" : "border-border"
              }`}
            >
              <p className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-muted">{paramitaIndex + 1}</span>
                <span className="text-lg font-bold">{paramita.name}</span>
                <span className="hanja text-muted">{paramita.hanja}</span>
              </p>
              <p className="mt-0.5 text-sm text-muted">
                {paramita.plainName} · <span lang="sa">{paramita.sanskrit}</span>
              </p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed">{paramita.description}</p>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-4 text-sm leading-relaxed text-muted">
        반야 계통의 대승 경전은 여섯 번째인 지혜(반야)바라밀이 나머지 다섯 바라밀을 이끈다고 강조합니다.
        테두리로 강조한 항목이 지혜바라밀입니다.
      </figcaption>
    </figure>
  );
}
