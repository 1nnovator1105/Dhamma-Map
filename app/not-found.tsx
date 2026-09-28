import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-4 pt-24 text-center sm:px-6">
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 className="mt-2 text-3xl font-bold">찾으시는 페이지가 없습니다</h1>
      <p className="mt-3 leading-relaxed text-muted">
        주소가 바뀌었거나 아직 작성되지 않은 개념일 수 있습니다. 전체 개념 목록에서 찾아보세요.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/concepts"
          className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-contrast hover:bg-accent-hover"
        >
          개념 목록 보기
        </Link>
        <Link href="/" className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:border-border-strong">
          홈으로
        </Link>
      </div>
    </div>
  );
}
