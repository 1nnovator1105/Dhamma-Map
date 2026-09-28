type PathFactor = {
  pathNumber: number;
  name: string;
  hanja: string;
  plainName: string;
  description: string;
};

type PathFactorGroup = {
  name: string;
  hanja: string;
  description: string;
  factors: PathFactor[];
};

/** 『맛지마 니까야』 44경의 분류(계·정·혜)를 팔정도의 순서대로 배치한다. */
const pathFactorGroups: PathFactorGroup[] = [
  {
    name: "지혜",
    hanja: "慧",
    description: "무엇을 어떻게 볼 것인가",
    factors: [
      {
        pathNumber: 1,
        name: "정견",
        hanja: "正見",
        plainName: "바른 견해",
        description: "괴로움과 그 원인, 소멸, 길을 있는 그대로 이해하기",
      },
      {
        pathNumber: 2,
        name: "정사유",
        hanja: "正思惟",
        plainName: "바른 생각",
        description: "욕심·악의·해치려는 마음에서 벗어난 생각",
      },
    ],
  },
  {
    name: "계",
    hanja: "戒",
    description: "어떻게 말하고 행동할 것인가",
    factors: [
      {
        pathNumber: 3,
        name: "정어",
        hanja: "正語",
        plainName: "바른 말",
        description: "거짓말·이간질·거친 말·쓸데없는 말을 삼가기",
      },
      {
        pathNumber: 4,
        name: "정업",
        hanja: "正業",
        plainName: "바른 행동",
        description: "생명을 해치거나 남의 것을 빼앗는 행동을 삼가기",
      },
      {
        pathNumber: 5,
        name: "정명",
        hanja: "正命",
        plainName: "바른 생계",
        description: "남을 해치지 않는 방법으로 살림을 꾸리기",
      },
    ],
  },
  {
    name: "정",
    hanja: "定",
    description: "마음을 어떻게 가꿀 것인가",
    factors: [
      {
        pathNumber: 6,
        name: "정정진",
        hanja: "正精進",
        plainName: "바른 노력",
        description: "해로운 마음은 줄이고 이로운 마음은 키우려는 노력",
      },
      {
        pathNumber: 7,
        name: "정념",
        hanja: "正念",
        plainName: "바른 알아차림",
        description: "몸·느낌·마음·현상을 있는 그대로 알아차리기",
      },
      {
        pathNumber: 8,
        name: "정정",
        hanja: "正定",
        plainName: "바른 집중",
        description: "흩어지지 않고 고요하게 모인 마음",
      },
    ],
  },
];

/** 팔정도를 여덟 가지 나열이 아니라 세 묶음(지혜·계·정)의 관계로 보여준다 (base_spec 25절). */
export function EightfoldPathDiagram() {
  return (
    <figure className="rounded-2xl border border-border bg-surface px-4 py-5 sm:px-6">
      <div className="grid gap-3 md:grid-cols-3">
        {pathFactorGroups.map((pathFactorGroup) => (
          <section
            key={pathFactorGroup.name}
            aria-label={`${pathFactorGroup.name} 묶음`}
            className="rounded-xl border border-border bg-surface-raised px-4 py-4"
          >
            <p className="flex items-baseline gap-2">
              <span className="text-lg font-bold">{pathFactorGroup.name}</span>
              <span className="hanja text-muted">{pathFactorGroup.hanja}</span>
            </p>
            <p className="mt-0.5 text-sm text-muted">{pathFactorGroup.description}</p>
            <ol className="mt-3 space-y-3 border-t border-border pt-3">
              {pathFactorGroup.factors.map((pathFactor) => (
                <li key={pathFactor.name} className="flex gap-3">
                  <span
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent"
                    aria-label={`팔정도 ${pathFactor.pathNumber}번째`}
                  >
                    {pathFactor.pathNumber}
                  </span>
                  <span>
                    <span className="font-semibold">{pathFactor.name}</span>{" "}
                    <span className="hanja text-sm text-muted">{pathFactor.hanja}</span>
                    <span className="block text-sm font-medium text-muted">{pathFactor.plainName}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed">{pathFactor.description}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-muted">
        숫자는 팔정도의 전통적인 순서입니다. 초기 경전(『맛지마 니까야』 44경)은 여덟 요소를 지혜·계·정
        세 묶음으로 나누어 설명합니다.
      </figcaption>
    </figure>
  );
}
