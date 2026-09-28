import Link from "next/link";

import { PageIntroduction } from "@/components/layout/PageIntroduction";
import { createPageMetadata } from "@/lib/page-metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "프로젝트 소개",
  description: "법의 지도는 불교의 어려운 개념을 일상의 언어와 사례, 시각적 설명으로 풀어내고 서로의 관계를 탐색하게 하는 불교 지식 지도입니다.",
  path: "/about",
});

const writingPrinciples = [
  {
    title: "어렵게 설명하지 않습니다",
    description: "전문 용어를 또 다른 전문 용어로 설명하지 않고, 일상의 언어와 예시에서 출발합니다.",
  },
  {
    title: "먼저 이해하고, 나중에 깊게",
    description: "30초 만에 이해할 수 있는 설명에서 시작해 철학적 배경과 원전으로 조금씩 들어갑니다.",
  },
  {
    title: "전통마다 다른 해석을 구분합니다",
    description: "초기불교, 대승불교, 선불교 등 전통에 따라 설명이 다를 때는 한쪽만 정답처럼 말하지 않습니다.",
  },
  {
    title: "믿음을 권하지 않습니다",
    description: "포교가 아니라 교육을 위한 서비스입니다. '불교에서는 이렇게 설명합니다'라고 소개할 뿐입니다.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6">
      <PageIntroduction title="프로젝트 소개">
        <p>
          {siteConfig.name}({siteConfig.englishName})는 불교의 어려운 개념을 일상의 언어와 사례, 시각적 설명으로
          풀어내고, 개념 사이의 연결을 따라 탐색할 수 있게 만드는 불교 지식 지도입니다.
        </p>
      </PageIntroduction>

      <section aria-labelledby="why-heading" className="mt-12">
        <h2 id="why-heading" className="text-xl font-bold">
          왜 만들었나요?
        </h2>
        <div className="mt-3 space-y-3 leading-relaxed">
          <p>
            사성제, 연기, 무아 같은 말을 검색하면 정확하지만 어려운 설명을 먼저 만나게 됩니다. 법의 지도는 그다음에
            떠오르는 질문, &ldquo;그래서 이게 무슨 뜻이지?&rdquo;에 가장 먼저 답하는 것을 목표로 합니다.
          </p>
          <p>
            &lsquo;지도&rsquo;라는 이름처럼, 하나의 개념을 이해하면 자연스럽게 연결된 다른 개념으로 이어 갈 수 있도록
            만들고 있습니다.
          </p>
        </div>
      </section>

      <section aria-labelledby="principles-heading" className="mt-12">
        <h2 id="principles-heading" className="text-xl font-bold">
          글쓰기 원칙
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {writingPrinciples.map((writingPrinciple) => (
            <li key={writingPrinciple.title} className="rounded-xl bg-surface px-5 py-4">
              <p className="font-semibold">{writingPrinciple.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{writingPrinciple.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="accuracy-heading" className="mt-12">
        <h2 id="accuracy-heading" className="text-xl font-bold">
          내용의 정확성에 대해
        </h2>
        <div className="mt-3 space-y-3 leading-relaxed">
          <p>
            각 문서는 초기 경전(팔리 니까야, 한역 아함경)과 대승 경전, 학술 자료를 바탕으로 쓰며, 문서 끝에 참고
            자료를 밝힙니다. 교리적으로 확실하지 않은 내용은 추측으로 채우지 않습니다.
          </p>
          <p>
            다만 이 사이트는 입문을 돕기 위한 쉬운 설명을 지향하므로, 깊은 공부를 위해서는 원전과 전문 서적을 함께
            읽어 보시기를 권합니다.
          </p>
        </div>
      </section>

      <p className="mt-12">
        <Link href="/concepts" className="font-semibold text-accent underline underline-offset-4">
          개념 둘러보기 →
        </Link>
      </p>
    </div>
  );
}
