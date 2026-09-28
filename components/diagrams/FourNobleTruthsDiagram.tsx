import Link from "next/link";
import type { ReactNode } from "react";

type NobleTruthCardProps = {
  teachingNumber: number;
  name: string;
  hanja: string;
  role: string;
  doctorAnalogy: string;
  children: ReactNode;
};

function NobleTruthCard({
  teachingNumber,
  name,
  hanja,
  role,
  doctorAnalogy,
  children,
}: NobleTruthCardProps) {
  return (
    <div className="flex-1 rounded-xl border border-border bg-surface-raised px-4 py-4">
      <div className="flex items-baseline justify-between gap-2">
        <p className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-muted" aria-label={`${teachingNumber}번째 진리`}>
            {teachingNumber}
          </span>
          <span className="text-xl font-bold">{name}</span>
          <span className="hanja text-base text-muted">{hanja}</span>
        </p>
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent">
          {role}
        </span>
      </div>
      <p className="mt-2 text-[0.9375rem] leading-relaxed">{children}</p>
      <p className="mt-2 text-xs text-muted">의사에 비유하면: {doctorAnalogy}</p>
    </div>
  );
}

function CauseToResultArrow() {
  return (
    <div className="flex items-center justify-center text-muted" aria-hidden="true">
      <span className="text-xl sm:hidden">↓</span>
      <span className="hidden text-xl sm:inline">→</span>
    </div>
  );
}

/**
 * 사성제의 구조: 두 개의 '원인 → 결과' 흐름으로 보여준다.
 * 가르침의 순서(고·집·멸·도)와 인과의 방향(집→고, 도→멸)을 함께 표시한다.
 */
export function FourNobleTruthsDiagram() {
  return (
    <figure className="rounded-2xl border border-border bg-surface px-4 py-5 sm:px-6">
      <div className="space-y-5">
        <section aria-label="괴로움이 생기는 흐름">
          <p className="mb-2 text-sm font-semibold text-muted">괴로움이 생기는 흐름</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
            <NobleTruthCard teachingNumber={2} name="집" hanja="集" role="원인" doctorAnalogy="병의 원인">
              괴로움을 일으키는 원인. 끝없이 바라고 붙잡으려는 마음(갈애)입니다.
            </NobleTruthCard>
            <CauseToResultArrow />
            <NobleTruthCard teachingNumber={1} name="고" hanja="苦" role="결과" doctorAnalogy="병의 증상">
              삶에서 겪는 괴로움과 불만족. 뜻대로 되지 않는 경험 전반을 가리킵니다.
            </NobleTruthCard>
          </div>
        </section>

        <section aria-label="괴로움이 사라지는 흐름">
          <p className="mb-2 text-sm font-semibold text-muted">괴로움이 사라지는 흐름</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
            <NobleTruthCard teachingNumber={4} name="도" hanja="道" role="방법" doctorAnalogy="처방">
              괴로움을 소멸로 이끄는 실천의 길.{" "}
              <Link href="/concepts/noble-eightfold-path" className="text-accent underline underline-offset-2">
                팔정도
              </Link>
              를 말합니다.
            </NobleTruthCard>
            <CauseToResultArrow />
            <NobleTruthCard teachingNumber={3} name="멸" hanja="滅" role="결과" doctorAnalogy="회복된 상태">
              괴로움의 원인이 사라져 괴로움이 그친 상태. 열반이라고도 부릅니다.
            </NobleTruthCard>
          </div>
        </section>
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-muted">
        숫자는 가르침의 순서(고 → 집 → 멸 → 도)이고, 화살표는 원인에서 결과로 향하는 방향입니다.
        결과를 먼저 보이고 그 원인을 밝히는 순서라서, 흔히 의사의 진료 과정에 비유합니다.
      </figcaption>
    </figure>
  );
}
