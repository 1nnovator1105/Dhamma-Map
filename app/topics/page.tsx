import Link from "next/link";

import { PageIntroduction } from "@/components/layout/PageIntroduction";
import { getAllTopicMetadata } from "@/lib/content/topics";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "주제로 보기",
  description: "괴로움, 집착, '나'처럼 누구나 한 번쯤 품어 본 질문에서 출발해 불교의 개념을 이해해 봅니다.",
  path: "/topics",
});

export default function TopicsPage() {
  const topics = getAllTopicMetadata();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
      <PageIntroduction title="주제로 보기">
        <p>개념 이름을 몰라도 괜찮습니다. 평소에 품었던 질문에서 시작해 보세요.</p>
      </PageIntroduction>

      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link
              href={`/topics/${topic.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface-raised px-6 py-5 transition-colors hover:border-accent"
            >
              <span className="text-xl font-semibold group-hover:text-accent">{topic.title}</span>
              <span className="mt-2 leading-relaxed text-muted">{topic.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
