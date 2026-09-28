import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const openGraphImageSize = { width: 1200, height: 630 };

const pretendardFontDirectory = path.join(process.cwd(), "node_modules/pretendard/dist/public/static");

// 폰트는 요청과 무관하므로 모듈 범위에서 한 번만 읽는다.
// Pretendard에는 한자 글리프가 없으므로 OG 이미지에는 한자를 넣지 않는다.
const pretendardBoldFont = readFile(path.join(pretendardFontDirectory, "Pretendard-Bold.otf"));
const pretendardRegularFont = readFile(path.join(pretendardFontDirectory, "Pretendard-Regular.otf"));

type OpenGraphImageContent = {
  /** 제목 위 작은 분류 문구. 예: "불교 개념" */
  eyebrow: string;
  title: string;
  /** 제목 아래 보조 제목. 예: 영문 이름 */
  subtitle?: string;
  description?: string;
};

/** 모든 페이지가 같은 모양의 OpenGraph 이미지를 쓰도록 하는 공용 렌더러. */
export async function renderOpenGraphImage({
  eyebrow,
  title,
  subtitle,
  description,
}: OpenGraphImageContent): Promise<ImageResponse> {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#fcfcfa",
          color: "#1d1d1b",
          fontFamily: "Pretendard",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#2e5c61", fontWeight: 700 }}>{eyebrow}</div>
          <div style={{ marginTop: 20, fontSize: 104, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            {title}
          </div>
          {subtitle ? <div style={{ marginTop: 16, fontSize: 38, color: "#5c5c57" }}>{subtitle}</div> : null}
          {description ? (
            <div style={{ marginTop: 36, fontSize: 34, lineHeight: 1.5, color: "#1d1d1b", maxWidth: 1000 }}>
              {description}
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30 }}>
          <div style={{ width: 20, height: 20, borderRadius: 10, background: "#2e5c61" }} />
          <div style={{ fontWeight: 700 }}>{siteConfig.name}</div>
          <div style={{ color: "#5c5c57" }}>{siteConfig.englishName}</div>
        </div>
      </div>
    ),
    {
      ...openGraphImageSize,
      fonts: [
        { name: "Pretendard", data: await pretendardBoldFont, weight: 700, style: "normal" },
        { name: "Pretendard", data: await pretendardRegularFont, weight: 400, style: "normal" },
      ],
    },
  );
}
