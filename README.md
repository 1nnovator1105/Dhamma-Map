# 법의 지도 (Dhamma Map)

불교의 어려운 개념을 일상의 언어와 사례, 시각적 설명으로 풀어내고 개념 사이의 연결을 탐색하게 하는 불교 지식 지도입니다.

- 제품·기술 기준 문서: [`docs/spec/base_spec.md`](./docs/spec/base_spec.md)
- 작업 규칙(사람·AI 공통): [`AGENTS.md`](./AGENTS.md)

## 시작하기

Node.js 22 이상이 필요합니다 (`.nvmrc` 참고).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 정적 빌드 + 콘텐츠 검증
npm run lint
npm run typecheck
```

백엔드, 데이터베이스, 로그인이 없는 정적 사이트입니다. 모든 페이지는 빌드 시 생성되며 Vercel에 그대로 배포할 수 있습니다.
배포 환경에서는 `VERCEL_PROJECT_PRODUCTION_URL`로 canonical·sitemap 주소를 만들고, 다른 도메인을 쓰려면 `NEXT_PUBLIC_SITE_URL`을 지정합니다.

## 폴더 구조

```text
app/                    라우트 (홈, /concepts, /topics, /map, /about, sitemap, robots, OG 이미지)
content/
  concepts/*.mdx        개념 문서 — 파일명 = slug
  topics/*.mdx          질문 기반 주제 문서
  learning-paths.json   학습 경로 (홈의 '처음이라면')
components/
  content/              MDX 안에서 쓰는 콘텐츠 컴포넌트 (+ mdx-components.tsx 등록부)
  diagrams/             개념별 구조 다이어그램
  illustrations/        본문 비유를 그린 SVG 삽화 (docs/illustration-guide.md)
  layout/ concepts/ search/ map/
lib/content/            MDX 읽기·frontmatter 검증(Zod)·검색 인덱스
public/concepts/<slug>/ 문서에 쓰는 이미지 (WebP 권장)
```

## 콘텐츠 작성하기

### 1. 파일 만들기

`content/concepts/<slug>.mdx`를 만듭니다. slug는 개념의 **영문 표준 번역어를 kebab-case로** 씁니다 (예: 연기 → `dependent-origination`). 파일명과 frontmatter의 `slug`가 같아야 합니다.

### 2. frontmatter

```yaml
---
title: 연기                     # 필수
slug: dependent-origination     # 필수 (파일명과 동일)
summary: 모든 것은 여러 원인과 조건에 의존해 생겨난다는 가르침입니다.  # 필수, 한 문장
category: [핵심 교리]           # 필수. lib/content/taxonomy.ts 목록 중에서
related: [impermanence, non-self]  # 필수. 연결된 개념 slug (없으면 [])
draft: false                    # 필수. true면 production에서 숨김

hanja: 緣起
english: Dependent Origination
sanskrit: pratītyasamutpāda
pali: paṭiccasamuppāda
tags: [조건, 인과]
aliases: [연기법, Dependent Arising]   # 검색용 다른 이름
difficulty: beginner            # beginner | intermediate | advanced
order: 40                       # 목록 정렬 순서
question: 모든 것은 어떻게 서로 영향을 주고받을까?   # 있으면 홈 '무엇이 궁금한가요?'에 노출
---
```

빌드할 때 스키마, slug 중복, 존재하지 않는 `related` slug를 검사하며 문제가 있으면 빌드가 실패합니다. 개발 서버에서는 연결 문제를 경고로만 보여 줍니다.

### 3. 본문 구조

쉬운 내용에서 어려운 내용 순서로 씁니다 (base_spec 38절).

```mdx
<ConceptSummary>한 문장 설명</ConceptSummary>

## 30초 만에 이해하기
## 쉽게 설명하면
## 예를 들어
## 흔한 오해
## 조금 더 깊게
## 다른 개념과 어떤 관계가 있을까?
<RelatedConcepts />
## 참고
```

`##`, `###` 제목은 자동으로 목차가 됩니다.

### 4. 사용할 수 있는 컴포넌트

| 컴포넌트 | 용도 |
| --- | --- |
| `<ConceptSummary>…</ConceptSummary>` | 문서 첫머리 한 문장 설명 |
| `<ExampleCard title="…">…</ExampleCard>` | 일상 예시 (여러 문단이면 안쪽 앞뒤를 한 줄씩 비운다) |
| `<Misconception wrong="…" right="…" />` | 흔한 오해와 실제 의미 |
| `<QuoteBlock source="…">…</QuoteBlock>` | 경전 인용 |
| `<ImageWithCaption src="/concepts/<slug>/x.webp" alt="…" caption="…" />` | 설명용 이미지 (기본 비율 16:9, `width`·`height`로 변경) |
| `<ConceptLink slug="non-self" />` | 본문 속 다른 개념 링크 (텍스트 생략 시 개념 제목) |
| `<RelatedConcepts relationDescriptions={{ "non-self": "…" }} />` | 관련 개념 카드. frontmatter `related`가 자동으로 들어가고, 관계 설명은 선택 |
| `<FourNobleTruthsDiagram />` `<EightfoldPathDiagram />` `<SixParamitasDiagram />` `<DependentOriginationDiagram />` | 개념별 구조 다이어그램 |
| `<SeedGrowthIllustration caption="…" />` 등 `…Illustration` | 본문의 비유·예시를 그린 삽화. 목록과 제작 규칙은 [`docs/illustration-guide.md`](./docs/illustration-guide.md) |

새 컴포넌트는 `components/content/mdx-components.tsx`에 등록해야 MDX에서 쓸 수 있습니다.

### 5. 문체와 정확성

- 전문 용어를 전문 용어로 설명하지 않습니다. 일상 언어 → 예시 → 원래 용어 순서로 씁니다.
- 전통(초기불교, 대승불교 등)에 따라 해석이 다르면 구분해서 씁니다.
- 확실하지 않은 교리는 추측으로 채우지 않고, 문서 끝 `## 참고`에 근거를 밝힙니다.
- 믿음을 권하는 표현("~해야 합니다", "이것이 진리입니다")을 쓰지 않습니다.
