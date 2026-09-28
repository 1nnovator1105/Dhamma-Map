import type { ReactNode } from "react";

export const illustrationWidth = 800;
export const illustrationHeight = 450;

export type IllustrationProps = {
  /** 그림 아래에 보이는 설명. 그림이 본문에서 무엇을 뜻하는지 MDX에서 적는다. */
  caption?: string;
};

type IllustrationFrameProps = IllustrationProps & {
  /** 화면 낭독기용 대체 텍스트. 그림에 무엇이 그려져 있는지 묘사한다. */
  description: string;
  children: ReactNode;
};

/**
 * 모든 삽화가 공유하는 16:9 SVG 틀 (docs/illustration-guide.md).
 * 색상은 illustration-* 토큰만 쓰므로 다크 모드에서도 자동으로 어울린다.
 */
export function IllustrationFrame({ description, caption, children }: IllustrationFrameProps) {
  return (
    <figure>
      <svg
        viewBox={`0 0 ${illustrationWidth} ${illustrationHeight}`}
        role="img"
        aria-label={description}
        className="h-auto w-full overflow-hidden rounded-xl border border-border bg-illustration-sky"
      >
        {children}
      </svg>
      {caption ? (
        <figcaption className="mt-2 text-center text-sm leading-relaxed text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
