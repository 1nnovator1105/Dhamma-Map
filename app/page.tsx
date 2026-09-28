import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { HeroSearchButton } from "@/components/search/HeroSearchButton";
import { getAllConceptMetadata, resolveConceptSlugs } from "@/lib/content/concepts";
import { getAllTopicMetadata, getLearningPathBySlug } from "@/lib/content/topics";
import { siteConfig } from "@/lib/site";

const homeTitle = `${siteConfig.name} — 불교의 어려운 개념을 일상의 언어로`;

// 홈은 레이아웃의 "제목 | 법의 지도" 템플릿 대신 서비스 소개 제목을 그대로 쓴다
export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: "/",
    title: homeTitle,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image", title: homeTitle, description: siteConfig.description },
};

const beginnerLearningPathSlug = "first-steps";

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-bold tracking-tight">
      {children}
    </h2>
  );
}

export default function HomePage() {
  const conceptsWithQuestion = getAllConceptMetadata().filter((concept) => concept.question);
  const beginnerLearningPath = getLearningPathBySlug(beginnerLearningPathSlug);
  const beginnerConcepts = beginnerLearningPath
    ? resolveConceptSlugs(beginnerLearningPath.conceptSlugs)
    : [];
  const topics = getAllTopicMetadata();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section aria-labelledby="hero-heading" className="pt-16 pb-14 sm:pt-24 sm:pb-20">
        <p className="text-sm font-semibold tracking-wide text-accent">
          {siteConfig.name} · {siteConfig.englishName}
        </p>
        <h1 id="hero-heading" className="mt-4 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
          불교의 어려운 개념을
          <br />
          일상의 언어로 이해해 보세요.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          사성제, 팔정도, 연기, 무상, 무아…
          <br />
          낯선 단어부터 하나씩 이어 가 봅니다.
        </p>
        <div className="mt-8">
          <HeroSearchButton />
        </div>
      </section>

      <section aria-labelledby="questions-heading" className="border-t border-border pt-12">
        <SectionHeading id="questions-heading">무엇이 궁금한가요?</SectionHeading>
        <p className="mt-2 text-muted">개념 이름을 몰라도 괜찮습니다. 마음에 걸리는 질문을 골라 보세요.</p>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {conceptsWithQuestion.map((concept) => (
            <li key={concept.slug}>
              <Link
                href={`/concepts/${concept.slug}`}
                className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-border bg-surface-raised px-5 py-5 transition-colors hover:border-accent"
              >
                <span className="text-lg leading-snug font-medium">{concept.question}</span>
                <span className="flex shrink-0 items-baseline gap-1.5 text-sm text-muted group-hover:text-accent">
                  <span aria-hidden="true">→</span>
                  <span className="font-semibold">{concept.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {beginnerLearningPath && beginnerConcepts.length > 0 ? (
        <section aria-labelledby="beginner-heading" className="mt-16">
          <SectionHeading id="beginner-heading">{beginnerLearningPath.title}</SectionHeading>
          <p className="mt-2 max-w-2xl text-muted">{beginnerLearningPath.description}</p>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {beginnerConcepts.map((concept, stepIndex) => (
              <li key={concept.slug}>
                <Link
                  href={`/concepts/${concept.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-surface px-5 py-5 transition-colors hover:bg-accent-soft"
                >
                  <span className="text-sm font-semibold text-muted">{stepIndex + 1}</span>
                  <span className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-lg font-semibold group-hover:text-accent">{concept.title}</span>
                    {concept.hanja ? <span className="hanja text-sm text-muted">{concept.hanja}</span> : null}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">{concept.summary}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {topics.length > 0 ? (
        <section aria-labelledby="topics-heading" className="mt-16">
          <div className="flex items-baseline justify-between gap-4">
            <SectionHeading id="topics-heading">주제로 이해하기</SectionHeading>
            <Link href="/topics" className="text-sm text-muted hover:text-foreground">
              전체 보기
            </Link>
          </div>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {topics.map((topic) => (
              <li key={topic.slug}>
                <Link href={`/topics/${topic.slug}`} className="group block py-4">
                  <span className="font-semibold group-hover:text-accent">{topic.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{topic.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="map-heading" className="mt-16 rounded-2xl bg-surface px-6 py-8 sm:px-8">
        <SectionHeading id="map-heading">개념은 서로 이어져 있습니다</SectionHeading>
        <p className="mt-2 max-w-2xl leading-relaxed text-muted">
          연기를 이해하면 무상이, 무상을 이해하면 무아가 궁금해집니다. 개념 사이의 연결을 한눈에 살펴보세요.
        </p>
        <Link
          href="/map"
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-contrast hover:bg-accent-hover"
        >
          개념 지도 보기 <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
