import Image from "next/image";

type ImageWithCaptionProps = {
  /** public 폴더 기준 경로. 예: "/concepts/impermanence/river.webp" */
  src: string;
  alt: string;
  caption?: string;
  /** 원본 이미지 크기. 레이아웃 흔들림을 막기 위한 비율 계산에 쓰인다. 기본 1600×900 (16:9). */
  width?: number;
  height?: number;
};

const articleImageSizes = "(min-width: 768px) 720px, 100vw";

export function ImageWithCaption({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
}: ImageWithCaptionProps) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={articleImageSizes}
        className="h-auto w-full rounded-xl border border-border bg-surface"
      />
      {caption ? (
        <figcaption className="mt-2 text-center text-sm leading-relaxed text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
