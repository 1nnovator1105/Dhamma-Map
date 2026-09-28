# 법의 지도 (Dhamma Map)

## Agentic AI Project Specification

**Document Version:** 0.1  
**Project Type:** Buddhist knowledge / educational web service  
**Primary Language:** Korean  
**Framework:** Next.js + TypeScript  
**Deployment:** Vercel  
**Content:** MDX-based static content  
**Backend:** None for MVP  
**Authentication:** None for MVP

---

# 1. Project Overview

## 1.1 프로젝트명

### 서비스명

**법의 지도**

### 영문명 / Repository Name

**Dhamma Map**

권장 repository 이름:

```text
dhamma-map
```

`Dhamma`는 불교에서 법(法), 즉 붓다의 가르침을 의미한다.

서비스 이름인 **법의 지도**는 단순한 불교 용어 사전이 아니라, 서로 연결된 불교 개념을 탐색할 수 있는 **지식 지도**라는 프로젝트의 방향을 표현한다.

---

# 2. Product Vision

법의 지도는 불교를 처음 접하는 사람이 사성제, 팔정도, 육바라밀, 연기, 무상, 무아와 같은 개념을 검색했을 때,

> "그래서 이게 무슨 뜻인데?"

라는 질문에 가장 먼저 답해주는 서비스를 목표로 한다.

전통적인 불교 문헌이나 백과사전은 정확하지만 초심자가 이해하기 어려운 경우가 많다.

법의 지도는 불교의 개념을 단순히 정의하는 것을 넘어 다음 흐름으로 설명한다.

```text
개념
↓
한 문장 설명
↓
쉬운 설명
↓
일상의 예시
↓
흔한 오해
↓
조금 더 깊은 설명
↓
다른 불교 개념과의 관계
↓
원전 및 참고 자료
```

사용자가 하나의 개념을 이해하면 자연스럽게 다른 개념으로 이동할 수 있도록 한다.

궁극적으로는 불교 개념들을 하나의 **연결된 지식 그래프**로 표현한다.

---

# 3. Core Product Principles

## 3.1 어렵게 설명하지 않는다

이 서비스의 최우선 사용자는 불교 연구자가 아니라 **불교에 관심이 생긴 일반인**이다.

전문 용어를 전문 용어로 설명하지 않는다.

예:

좋지 않은 설명:

```text
연기는 제법이 인연생기한다는 연기법을 의미한다.
```

좋은 설명:

```text
어떤 것도 혼자서 생겨나지 않고,
여러 원인과 조건이 만나 생겨난다는 생각입니다.
```

---

## 3.2 먼저 이해시키고 나중에 깊게 설명한다

문서의 첫 번째 목표는 정확한 논문식 설명이 아니라 **직관적인 이해**이다.

문서 구조는 반드시 쉬운 내용에서 어려운 내용으로 이동한다.

```text
30초 이해
→
쉬운 설명
→
예시
→
상세 설명
→
철학적 배경
→
원전
```

---

# 3.3 예시를 적극적으로 사용한다

불교 개념은 일상의 사건과 연결했을 때 이해하기 쉬워진다.

예를 들어 연기를 설명할 때 다음과 같은 사례를 사용할 수 있다.

```text
오늘 회사에서 누군가의 말 때문에 화가 났다고 생각해봅시다.

그 화는 단순히 상대방의 말 하나 때문에 생겼을까요?

- 잠을 잘 자지 못했고
- 최근 스트레스가 있었고
- 비슷한 과거 경험이 있었고
- 상대에게 기대한 것이 있었고
- 그 말을 특정한 의미로 받아들였을 수도 있습니다.

이 여러 조건이 함께 작용해
'화'라는 경험이 만들어졌다고 볼 수 있습니다.
```

---

# 3.4 특정 종파의 해석을 절대적인 정답처럼 제시하지 않는다

불교에는 다양한 전통과 해석이 존재한다.

대표적으로:

- 초기불교 / 테라와다
- 대승불교
- 선불교
- 티베트불교
- 동아시아 불교

전통에 따라 의미나 강조점이 달라질 경우 반드시 구분해서 설명한다.

예:

```text
전통에 따라 이 개념을 설명하는 방식에는 차이가 있습니다.

초기불교에서는 ...
대승불교에서는 ...
```

---

# 3.5 지나친 종교적 권유를 하지 않는다

법의 지도는 포교 사이트보다 **교육형 지식 서비스**에 가깝다.

다음과 같은 표현을 피한다.

```text
반드시 이렇게 수행해야 합니다.
이것이 진리입니다.
이 가르침을 따르면 행복해집니다.
```

대신:

```text
불교에서는 이를 이렇게 설명합니다.
이 관점에서는 다음과 같이 이해할 수 있습니다.
```

---

# 4. Target User

## Primary User

불교 철학에 관심이 생겼지만 전문적인 불교 서적을 읽기는 부담스러운 사용자.

대표적인 상황:

```text
"사성제가 뭐야?"

"팔정도랑 사성제는 무슨 관계야?"

"무아가 내가 없다는 뜻이야?"

"연기가 모든 것이 연결되어 있다는 뜻인가?"

"육바라밀이 뭐고 왜 여섯 가지야?"
```

---

## Secondary User

불교 관련 책이나 콘텐츠를 보다가 모르는 개념을 빠르게 찾아보고 싶은 사람.

---

# 5. User Experience Goal

사용자가 검색을 통해 `연기` 페이지에 진입했다고 가정한다.

페이지 상단에서 30초 안에 다음 질문에 답할 수 있어야 한다.

```text
연기가 무엇인가?
```

1~3분 안에는 다음을 이해할 수 있어야 한다.

```text
왜 불교에서 연기가 중요한가?
```

페이지를 끝까지 읽었을 때는 다음 질문으로 자연스럽게 이동할 수 있어야 한다.

```text
연기와 무상은 무슨 관계인가?
연기와 무아는 어떻게 연결되는가?
```

즉 서비스의 핵심 UX는:

```text
검색
→
이해
→
예시
→
연결
→
탐색
```

이다.

---

# 6. MVP Scope

MVP에서 구현해야 하는 기능은 다음과 같다.

## 필수 기능

- 홈페이지
- 개념 목록
- 개념 상세 페이지
- 카테고리 탐색
- 관련 개념 표시
- 사이트 검색
- 문서 내부 목차
- 이미지 삽입
- React 기반 설명용 시각화 컴포넌트
- 반응형 모바일 UI
- 기본 SEO
- OpenGraph
- sitemap
- 정적 생성

---

# 7. Explicit Non-Goals

MVP에서는 다음 기능을 구현하지 않는다.

```text
로그인
회원가입
댓글
북마크 서버 저장
개인화
관리자 페이지
CMS
Supabase
Firebase
PostgreSQL
API 서버
사용자 생성 콘텐츠
결제
구독
AI 챗봇
```

필요성이 확인되기 전까지 백엔드를 추가하지 않는다.

---

# 8. Technology Stack

## Core

```text
Next.js
React
TypeScript
App Router
```

최신 안정 버전을 사용한다.

---

## Styling

기본:

```text
Tailwind CSS
```

필요한 경우:

```text
shadcn/ui
```

사용 가능.

단, 단순한 UI까지 모두 shadcn 컴포넌트로 추상화하지 않는다.

---

## Content

```text
MDX
```

MDX는 단순 Markdown 문서가 아니라 다음 역할을 한다.

> 콘텐츠 구조 + React 시각화 삽입 포인트

즉:

```text
MDX = 콘텐츠
React = 표현
```

이라는 원칙을 사용한다.

---

# 9. Rendering Strategy

콘텐츠는 정적 콘텐츠이므로 가능한 한 빌드 타임에 생성한다.

개념 페이지:

```text
/concepts/[slug]
```

는 `generateStaticParams`를 이용해 정적 생성한다.

MVP에서는 사용자별 동적 데이터가 없기 때문에 불필요한 서버 렌더링을 사용하지 않는다.

목표:

```text
Static First
```

---

# 10. Recommended Project Structure

```text
dhamma-map/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   ├── concepts/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── topics/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── map/
│   │   └── page.tsx
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   └── sitemap.ts
│
├── content/
│   ├── concepts/
│   │   ├── four-noble-truths.mdx
│   │   ├── noble-eightfold-path.mdx
│   │   ├── six-paramitas.mdx
│   │   ├── dependent-origination.mdx
│   │   ├── impermanence.mdx
│   │   └── non-self.mdx
│   │
│   └── topics/
│       ├── why-do-we-suffer.mdx
│       ├── what-is-buddhism.mdx
│       └── buddhism-for-beginners.mdx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileNavigation.tsx
│   │
│   ├── content/
│   │   ├── ConceptSummary.tsx
│   │   ├── ExampleCard.tsx
│   │   ├── Misconception.tsx
│   │   ├── QuoteBlock.tsx
│   │   ├── ImageWithCaption.tsx
│   │   ├── ConceptLink.tsx
│   │   ├── RelatedConcepts.tsx
│   │   ├── ConceptComparison.tsx
│   │   └── SourceReference.tsx
│   │
│   ├── diagrams/
│   │   ├── FourNobleTruthsDiagram.tsx
│   │   ├── EightfoldPathDiagram.tsx
│   │   ├── SixParamitasDiagram.tsx
│   │   └── ConceptGraph.tsx
│   │
│   └── ui/
│
├── lib/
│   ├── content/
│   │   ├── concepts.ts
│   │   ├── mdx.ts
│   │   └── search.ts
│   │
│   └── utils.ts
│
├── public/
│   └── concepts/
│       ├── impermanence/
│       ├── non-self/
│       ├── dependent-origination/
│       └── four-noble-truths/
│
├── types/
│   └── content.ts
│
└── SPEC.md
```

구조는 구현 과정에서 합리적인 이유가 있을 경우 수정할 수 있다.

그러나 `content`, `components/content`, `components/diagrams`의 책임은 분리한다.

---

# 11. Information Architecture

최상위 정보 구조:

```text
Home
│
├── 개념
│   ├── 사성제
│   ├── 팔정도
│   ├── 육바라밀
│   ├── 연기
│   ├── 무상
│   └── 무아
│
├── 주제로 이해하기
│   ├── 불교에서 말하는 괴로움이란?
│   ├── 집착은 왜 괴로움을 만드는가?
│   └── 나는 정말 존재하지 않는다는 뜻일까?
│
├── 법의 지도
│
└── 프로젝트 소개
```

---

# 12. Homepage Specification

홈페이지는 사전의 첫 페이지처럼 만들지 않는다.

첫 화면의 목적은:

> 사용자가 자신이 가진 질문에서 불교 개념으로 진입하게 만드는 것.

---

## Hero

예시:

```text
법의 지도

불교의 어려운 개념을
일상의 언어로 이해해보세요.
```

보조 문구:

```text
사성제, 팔정도, 연기, 무상, 무아...
낯선 단어부터 하나씩 이어가 봅니다.
```

---

# 13. Question-Based Entry

홈에서는 개념명을 먼저 노출하기보다 질문을 사용할 수 있다.

예:

```text
삶에는 왜 괴로움이 있을까?
→ 사성제

괴로움에서 벗어나기 위해 어떻게 살아야 할까?
→ 팔정도

왜 모든 것은 변할까?
→ 무상

'나'라는 것은 무엇일까?
→ 무아

모든 것은 어떻게 생겨날까?
→ 연기

타인과 어떻게 살아가야 할까?
→ 육바라밀
```

이 부분은 홈의 핵심 콘텐츠다.

---

# 14. Concept Page

모든 개념 페이지는 가능한 한 동일한 읽기 흐름을 갖는다.

권장 구조:

```text
제목
↓
한문 / 원어 / 영어
↓
한 문장 설명
↓
30초 이해
↓
시각화
↓
쉬운 설명
↓
일상 예시
↓
흔한 오해
↓
조금 더 깊게 보기
↓
다른 개념과의 관계
↓
관련 개념
↓
원전 / 참고자료
```

모든 섹션이 필수인 것은 아니다.

---

# 15. MDX Frontmatter Specification

모든 concept MDX는 다음 메타데이터를 사용할 수 있다.

```yaml
---
title: 연기

slug: dependent-origination

hanja: 緣起

english: Dependent Origination

sanskrit: pratītyasamutpāda

pali: paṭiccasamuppāda

summary: 모든 것은 여러 원인과 조건에 의존해 생겨난다는 가르침입니다.

category:
  - 핵심교리

tags:
  - 연기
  - 무상
  - 무아

difficulty: beginner

related:
  - impermanence
  - non-self
  - four-noble-truths

aliases:
  - 연기법

order: 10

draft: false
---
```

모든 필드를 필수로 강제하지 않는다.

필수 필드:

```text
title
slug
summary
category
related
draft
```

---

# 16. Concept Categories

초기 카테고리는 지나치게 세분화하지 않는다.

예:

```text
핵심 교리
수행
윤리
마음
지혜
대승불교
불교 용어
```

카테고리는 콘텐츠가 늘면서 변경 가능하다.

---

# 17. Initial Content Set

MVP에서 먼저 작성할 핵심 콘텐츠.

## 최우선

```text
불교
붓다
법
사성제
고
집
멸
도
팔정도
정견
정사유
정어
정업
정명
정정진
정념
정정
연기
무상
무아
열반
업
집착
갈애
```

---

## 다음 단계

```text
삼법인
오온
십이연기
중도
자비
자애
보시
계율
선정
지혜
육바라밀
공
보살
```

MVP 시작 시 모든 글을 작성할 필요는 없다.

우선 대표 콘텐츠 6~10개를 완성하고 UI를 검증한다.

초기 대표 콘텐츠:

```text
사성제
팔정도
육바라밀
연기
무상
무아
```

---

# 18. MDX Component System

MDX 안에서는 자유로운 JSX 작성보다 **정의된 콘텐츠 컴포넌트를 우선적으로 사용한다.**

목표:

1. 콘텐츠 디자인 일관성
2. 작성 편의성
3. 모바일 대응
4. 이후 디자인 변경 용이성

---

# 19. ConceptSummary

페이지 시작 부분에 사용한다.

```mdx
<ConceptSummary>
  모든 것은 혼자 존재하거나 생겨나는 것이 아니라, 다른 원인과 조건에 의존해
  생겨납니다.
</ConceptSummary>
```

시각적으로 강조하되 과도한 카드 UI를 사용하지 않는다.

---

# 20. ExampleCard

일상 예시를 보여준다.

```mdx
<ExampleCard title="회사에서 화가 났을 때">

누군가의 한마디 때문에 화가 났다고 생각해봅시다.

하지만 그 감정에는 수면 부족, 과거 경험,
상대에 대한 기대 같은 여러 조건이 함께 작용했을 수 있습니다.

</ExampleCard>
```

---

# 21. Misconception

오해와 실제 의미를 비교한다.

```mdx
<Misconception
  wrong="무아는 내가 존재하지 않는다는 뜻이다."
  right="무아는 변하지 않는 독립적 자아가 존재한다는 생각을 다시 살펴보는 가르침에 가깝습니다."
/>
```

또는 compound component 패턴을 사용할 수 있다.

구현은 단순한 쪽을 선택한다.

---

# 22. ImageWithCaption

```mdx
<ImageWithCaption
  src="/concepts/impermanence/river.webp"
  alt="계속 흐르고 있는 강"
  caption="같은 강처럼 보여도 그 안의 물은 계속 변하고 있습니다."
/>
```

내부적으로 Next.js `Image`를 사용한다.

---

# 23. Diagram Components

이 프로젝트에서 중요한 차별점이다.

불교 개념을 글만으로 설명하지 않고 관계와 흐름을 시각화한다.

초기 구현 후보:

```text
FourNobleTruthsDiagram
EightfoldPathDiagram
SixParamitasDiagram
ConceptRelationDiagram
```

---

# 24. Four Noble Truths Visualization

예:

```text
고 苦
↓
집 集
↓
멸 滅
↓
도 道
```

그러나 단순 화살표만 보여주는 것이 아니라 각 요소를 선택하면 짧은 설명을 볼 수 있도록 발전 가능하다.

MVP에서는 인터랙션이 필수는 아니다.

---

# 25. Eightfold Path Visualization

팔정도는 단순 8개 나열보다 세 범주 관계를 표현한다.

```text
지혜 慧
├─ 정견
└─ 정사유

계 戒
├─ 정어
├─ 정업
└─ 정명

정 定
├─ 정정진
├─ 정념
└─ 정정
```

---

# 26. Six Paramitas Visualization

```text
보시
지계
인욕
정진
선정
지혜
```

각 항목을 짧은 설명과 함께 카드 또는 흐름으로 보여준다.

---

# 27. Knowledge Graph

장기적으로 법의 지도의 대표 기능으로 발전시킨다.

각 MDX의 `related` 메타데이터를 이용한다.

예:

```yaml
related:
  - impermanence
  - non-self
  - dependent-origination
```

이를 기반으로 관계 데이터를 생성한다.

개념 예:

```text
        연기
       /   \
     무상 ─ 무아
       \
       사성제
          \
          팔정도
```

---

# 28. Knowledge Graph MVP

첫 버전에서는 복잡한 force graph를 구현하지 않아도 된다.

우선 다음 정도로 구현한다.

```text
현재 개념
↓
연결된 개념 카드
```

예:

```text
연기와 연결된 개념

[무상]
조건이 변하기 때문에 모든 것은 변화합니다.

[무아]
고정된 자아 역시 여러 조건의 결합으로 설명할 수 있습니다.

[사성제]
괴로움 역시 원인과 조건에 의해 발생합니다.
```

이후 `/map` 페이지에서 전체 그래프로 발전시킨다.

---

# 29. Search

검색은 MVP에서도 제공한다.

백엔드 검색 서버를 구축하지 않는다.

콘텐츠 수가 적기 때문에 빌드 시 검색용 index를 만들거나 클라이언트에서 간단한 fuzzy search를 사용한다.

검색 대상:

```text
title
aliases
hanja
english
summary
tags
```

검색 예:

```text
무아
無我
non-self
나
자아
```

---

# 30. Search UX

검색창 placeholder 예:

```text
사성제, 무아, 연기...
```

검색 결과에는 제목만 보여주지 않는다.

```text
연기 緣起

모든 것은 여러 원인과 조건에 의존해
생겨난다는 가르침입니다.
```

정도의 요약을 함께 표시한다.

---

# 31. URLs

URL에서는 영문 slug를 기본으로 한다.

```text
/concepts/four-noble-truths
/concepts/eightfold-path
/concepts/dependent-origination
/concepts/impermanence
/concepts/non-self
/concepts/six-paramitas
```

화면에서는 한글을 우선한다.

예:

```text
연기
緣起
Dependent Origination
```

---

# 32. Design Direction

디자인은 사찰이나 전통 불교 이미지를 과도하게 사용하는 방향을 피한다.

목표 느낌:

```text
차분함
여백
읽기 편함
현대적인 지식 서비스
약간의 명상적 분위기
```

하지만:

```text
금색
연꽃
불상
사찰
향
한지 질감
```

등을 반복적으로 사용하는 전형적인 종교 사이트 디자인은 지양한다.

---

# 33. Visual Reference Direction

가까운 디자인 성격:

```text
Wikipedia의 정보성
+
Notion의 읽기 편한 구조
+
Linear의 절제된 UI
+
현대적인 디지털 교과서
```

어느 특정 서비스를 복제하지 않는다.

---

# 34. Typography

본문 가독성을 최우선으로 한다.

한 줄 길이는 지나치게 길지 않게 한다.

Desktop 기준:

```text
content max-width: 약 720~800px
```

문서 페이지 전체 컨테이너는 더 넓게 사용할 수 있으나 본문 텍스트는 제한한다.

---

# 35. Article Layout

Desktop:

```text
┌────────────┬──────────────────────┬────────────┐
│            │                      │            │
│ navigation │       article        │    TOC     │
│            │                      │            │
└────────────┴──────────────────────┴────────────┘
```

화면 폭이 충분하지 않으면 좌우 요소를 축소 또는 숨긴다.

Mobile에서는 본문 읽기를 최우선으로 한다.

---

# 36. Content Tone

문체는 다음 특성을 갖는다.

```text
친절함
차분함
단정함
쉽지만 유치하지 않음
종교적 강요 없음
```

좋은 예:

```text
무상은 단순히 "모든 것이 사라진다"는 이야기가 아닙니다.

우리가 경험하는 모든 것이 조건에 따라 계속 변하고 있다는 관점에 가깝습니다.
```

피해야 할 예:

```text
무상의 진리를 깨달아야 합니다.
```

---

# 37. Explanation Rule

어려운 개념을 설명할 때:

```text
전문 용어
→
전문 용어 설명
```

패턴을 피한다.

대신:

```text
개념
→
일상 언어
→
예시
→
원래 불교 용어
```

순서를 사용한다.

---

# 38. Concept Writing Template

신규 개념 문서는 기본적으로 다음 구조를 참고한다.

```mdx
---
metadata
---

<ConceptSummary>한 문장 설명</ConceptSummary>

## 30초 만에 이해하기

가장 쉬운 설명.

<Diagram />

## 쉽게 설명하면

조금 더 상세한 설명.

## 예를 들어

<ExampleCard>일상 사례</ExampleCard>

## 흔한 오해

<Misconception />

## 조금 더 깊게

철학적 배경 또는 전통적 설명.

## 다른 개념과 어떤 관계가 있을까?

관련 개념 설명.

<RelatedConcepts />

## 참고

원전 또는 신뢰 가능한 자료.
```

문서 특성에 따라 섹션을 생략하거나 추가할 수 있다.

---

# 39. Content Accuracy

AI가 불교 콘텐츠를 작성할 경우 사실성을 특히 주의한다.

Agent는 불확실한 불교 교리 내용을 추측해서 작성하지 않는다.

전통에 따라 해석 차이가 있을 경우 이를 명시한다.

예:

```text
일부 대승불교 전통에서는 ...
```

또는:

```text
초기불교 문헌에서는 ...
```

---

# 40. Source Strategy

초기에는 각 문서 하단에 간단한 참고 자료 섹션을 제공한다.

향후 가능한 출처:

```text
초기불교 경전
팔리 니까야
한역 아함경
대승 경전
불교 학술 자료
신뢰 가능한 불교 기관 자료
학술 서적
```

출처 없는 AI 생성 해설만으로 교리적 주장을 확정하지 않는다.

---

# 41. Images

이미지는 외부 CDN에 의존하기보다 초기에는 repository에서 관리한다.

구조:

```text
public/
└── concepts/
    └── dependent-origination/
        ├── seed.webp
        └── conditions.webp
```

가능한 경우 WebP 또는 AVIF를 사용한다.

---

# 42. Image Policy

이미지는 장식 목적보다 설명 목적을 우선한다.

좋은 이미지:

```text
계절 변화
흐르는 강
씨앗과 성장
상호 의존 관계
시간 변화
```

지양:

```text
문서마다 의미 없이 들어가는 불상 사진
랜덤 사찰 사진
스톡 명상 이미지
```

---

# 43. Interactive Visualization

React 컴포넌트는 MDX 중간에 자유롭게 삽입할 수 있어야 한다.

예:

```mdx
## 사성제는 어떤 구조일까?

<FourNobleTruthsDiagram />

사성제는 네 개의 독립적인 명제가 아니라...
```

즉 MDX의 역할은 단순한 Markdown이 아니다.

---

# 44. Component Philosophy

시각화 컴포넌트는 지나치게 범용적으로 설계하지 않는다.

예를 들어 처음부터:

```text
UniversalBuddhistKnowledgeGraphDiagramEngine
```

같은 추상화를 만들지 않는다.

먼저:

```text
FourNobleTruthsDiagram
EightfoldPathDiagram
```

처럼 구체적인 컴포넌트를 구현한다.

여러 컴포넌트에서 실제 중복 패턴이 발견된 뒤 추상화한다.

---

# 45. Avoid Overengineering

다음 라이브러리는 명확한 이유가 생기기 전까지 추가하지 않는다.

```text
Redux
Zustand
TanStack Query
database ORM
GraphQL
tRPC
Supabase
Firebase
```

현재 프로젝트에는 서버 상태가 거의 존재하지 않는다.

React state 또는 URL state로 해결 가능한 문제는 별도 상태관리 라이브러리를 사용하지 않는다.

---

# 46. SEO

각 concept page는 고유 metadata를 가진다.

예:

```text
title:
연기란 무엇인가? | 법의 지도

description:
불교의 연기(緣起)를 쉬운 설명과 일상의 예시로 알아봅니다.
```

---

# 47. Structured Metadata

가능하면 다음을 지원한다.

```text
canonical URL
OpenGraph
Twitter card
sitemap.xml
robots.txt
```

콘텐츠 페이지는 검색 엔진에서 정상적으로 index 가능해야 한다.

---

# 48. Accessibility

최소 WCAG 기본 원칙을 따른다.

반드시:

```text
semantic HTML
keyboard navigation
visible focus
alt text
sufficient contrast
heading hierarchy
button / anchor distinction
```

시각화 역시 색상만으로 정보를 구분하지 않는다.

---

# 49. Performance

Vercel 배포를 기준으로 높은 Lighthouse 성능을 목표로 한다.

주의:

```text
불필요한 client component 금지
불필요한 JavaScript 금지
대형 이미지 최적화
폰트 최소화
dynamic import는 필요한 경우만
```

Server Component를 기본으로 한다.

인터랙션이 필요한 컴포넌트에만 `"use client"`를 사용한다.

---

# 50. Responsive Behavior

Mobile first로 구현한다.

주요 테스트 크기:

```text
Mobile
Tablet
Desktop
Wide Desktop
```

특히 개념 다이어그램은 모바일에서 내용이 잘리거나 지나치게 작아지지 않아야 한다.

필요하다면:

```text
horizontal scroll
stacked layout
responsive diagram
```

을 사용한다.

---

# 51. MVP Pages

## `/`

홈페이지.

---

## `/concepts`

전체 개념.

필터:

```text
카테고리
난이도
```

MVP에서는 단순한 filter UI만 구현한다.

---

## `/concepts/[slug]`

개념 상세.

---

## `/topics`

질문 기반 콘텐츠.

예:

```text
불교에서 괴로움이란 무엇인가?
왜 집착은 괴로움을 만들까?
무아는 내가 없다는 뜻일까?
```

---

## `/map`

개념 관계 지도.

첫 버전에서는 단순 관계 표현 가능.

---

## `/about`

프로젝트 소개.

---

# 52. Navigation

Header 기본 구성:

```text
법의 지도

개념
주제로 보기
지도

검색
```

Mobile에서는 간소화한다.

---

# 53. Related Concepts

모든 주요 개념 페이지 하단에는 관련 개념을 보여준다.

단순 태그 나열이 아니라 관계 설명이 있으면 좋다.

예:

```text
무상

모든 조건은 계속 변화하기 때문에
연기로 생겨난 현상 역시 고정되어 있지 않습니다.
```

---

# 54. Breadcrumb

예:

```text
홈
/
개념
/
연기
```

SEO 및 탐색을 위해 제공한다.

---

# 55. Table of Contents

긴 문서에는 자동 목차를 제공한다.

Desktop에서는 우측 sticky 영역 사용 가능.

Mobile에서는 접을 수 있는 형태가 적절하다.

---

# 56. Dark Mode

필수 기능은 아니다.

구조적으로 쉽게 대응 가능하도록 색상 값을 직접 하드코딩하지 않는다.

Tailwind semantic token 또는 CSS variable을 사용한다.

---

# 57. Analytics

MVP에서는 분석 도구 없이 시작해도 된다.

추후 필요하면:

```text
Vercel Analytics
```

정도를 우선 고려한다.

---

# 58. Future Features

현재 구현하지 않지만 구조적으로 고려할 기능.

```text
전체 개념 그래프
개념 학습 경로
랜덤 개념
오늘의 불교 개념
북마크
읽은 문서 기록
퀴즈
AI 질문
개념 비교
원전과 쉬운 설명 병렬 보기
다국어
CMS
```

---

# 59. Potential Learning Paths

향후 다음과 같은 학습 경로를 만들 수 있다.

### 불교 처음 시작하기

```text
붓다
→
괴로움
→
사성제
→
팔정도
```

### 세상은 왜 변할까

```text
연기
→
무상
→
무아
```

### 대승불교 이해하기

```text
보살
→
육바라밀
→
공
→
자비
```

현재는 데이터 구조만 확장 가능하게 유지한다.

---

# 60. Agentic AI Development Rules

Agent가 프로젝트를 구현할 때 다음 원칙을 따른다.

## Rule 1

기존 architecture를 먼저 확인하고 수정한다.

불필요하게 새로운 패턴을 도입하지 않는다.

## Rule 2

기능 구현 전 현재 요구사항에 정말 필요한 dependency인지 판단한다.

## Rule 3

가능하면 Server Component를 사용한다.

## Rule 4

Content와 UI를 강하게 결합하지 않는다.

MDX 콘텐츠는 UI implementation detail을 최소한으로 알아야 한다.

## Rule 5

하지만 과도한 abstraction 역시 피한다.

실제 중복이 발생하기 전까지 미래를 위한 추상화를 만들지 않는다.

## Rule 6

콘텐츠를 코드 안에 하드코딩하지 않는다.

개념 정보는 가능한 한 MDX/frontmatter에서 관리한다.

## Rule 7

접근성과 모바일 레이아웃을 구현 완료 조건에 포함한다.

## Rule 8

UI를 구현한 뒤 desktop뿐 아니라 mobile breakpoint를 반드시 확인한다.

---

# 61. Agent Content Rules

AI Agent가 불교 문서를 생성하거나 수정할 경우:

1. 먼저 일반 사용자가 이해할 수 있는 말로 설명한다.
2. 전문 용어를 연속으로 사용하지 않는다.
3. 최소 하나의 구체적 예시를 제공한다.
4. 오해하기 쉬운 개념은 `Misconception`을 사용한다.
5. 종파별 해석 차이가 있으면 구분한다.
6. 확신할 수 없는 교리적 사실을 만들어내지 않는다.
7. 불교를 믿어야 한다는 식의 표현을 하지 않는다.
8. 현대 심리학과 불교를 동일한 개념으로 단정하지 않는다.
9. 현대 과학이 불교를 증명했다는 식의 표현을 사용하지 않는다.
10. 가능한 경우 관련 개념으로 연결한다.

---

# 62. Code Quality

TypeScript에서 불필요한 `any` 사용을 피한다.

공통 데이터 구조는 명시적으로 type을 선언한다.

예:

```ts
export type ConceptMeta = {
  title: string;
  slug: string;
  summary: string;
  category: string[];
  related: string[];
  draft: boolean;

  hanja?: string;
  english?: string;
  sanskrit?: string;
  pali?: string;
  tags?: string[];
  aliases?: string[];
  difficulty?: "beginner" | "intermediate" | "advanced";
  order?: number;
};
```

---

# 63. Error Handling

잘못된 slug 접근:

```text
404
```

관련 concept slug가 존재하지 않는 경우 앱 전체가 crash하지 않도록 한다.

development 환경에서는 잘못된 relation을 발견할 수 있도록 warning을 제공해도 좋다.

---

# 64. Content Validation

가능하면 build 시 frontmatter validation을 수행한다.

추천:

```text
Zod
```

Zod는 콘텐츠 스키마 검증 용도로 사용할 수 있다.

예:

```text
duplicate slug
invalid related slug
missing title
invalid difficulty
```

등을 빌드 중 발견하도록 한다.

---

# 65. Search Index Generation

모든 공개 concept metadata에서 search index를 생성한다.

Draft 문서는 검색 결과에서 제외한다.

예:

```ts
{
  (title, slug, summary, aliases, hanja, english, tags);
}
```

전체 MDX body를 검색할 필요는 MVP에서는 없다.

---

# 66. Draft Handling

frontmatter:

```yaml
draft: true
```

인 문서는 production build에서 노출하지 않는다.

development에서는 선택적으로 확인할 수 있다.

---

# 67. Homepage Initial Content

첫 버전 Hero 이후 다음 콘텐츠를 제공한다.

```text
무엇이 궁금한가요?

삶에는 왜 괴로움이 있을까?
→ 사성제

왜 모든 것은 변할까?
→ 무상

나는 변하지 않는 '나'일까?
→ 무아

모든 것은 어떻게 서로 영향을 주고받을까?
→ 연기

괴로움을 줄이기 위해 무엇을 할 수 있을까?
→ 팔정도

다른 존재와 어떻게 살아가야 할까?
→ 육바라밀
```

그 아래:

```text
처음이라면

사성제
연기
무상
무아
팔정도
```

를 추천한다.

---

# 68. Visual Identity

서비스 로고는 MVP에서 복잡하게 만들 필요가 없다.

Wordmark:

```text
법의 지도
```

또는:

```text
법의 지도
Dhamma Map
```

텍스트 기반으로 시작한다.

추후 지도, 연결, 길이라는 개념을 활용한 symbol을 개발할 수 있다.

---

# 69. Definition of MVP Done

MVP 완료 조건:

```text
Next.js 프로젝트가 정상적으로 실행된다.

Vercel에 배포 가능하다.

홈페이지가 존재한다.

개념 목록 페이지가 존재한다.

MDX 기반 concept detail route가 동작한다.

최소 6개 핵심 개념 문서가 존재한다.

사성제
팔정도
육바라밀
연기
무상
무아

관련 개념 navigation이 동작한다.

사이트 검색이 동작한다.

이미지를 MDX 내부에서 사용할 수 있다.

React 기반 diagram을 MDX 내부에서 사용할 수 있다.

최소 하나의 실제 diagram이 구현되어 있다.

모바일 화면이 정상적으로 동작한다.

SEO metadata가 생성된다.

sitemap이 존재한다.

draft 콘텐츠가 production에서 제외된다.

빌드가 TypeScript error 없이 통과한다.
```

---

# 70. Recommended Initial Implementation Order

### Phase 1 — Foundation

```text
Next.js project 생성
Tailwind 설정
global layout
typography
header
footer
content width
```

### Phase 2 — Content Engine

```text
MDX loader
frontmatter schema
ConceptMeta type
content query utilities
generateStaticParams
```

### Phase 3 — Concept Page

```text
/concepts/[slug]
metadata
breadcrumb
article layout
TOC
related concepts
```

### Phase 4 — Content Components

```text
ConceptSummary
ExampleCard
Misconception
ImageWithCaption
RelatedConcepts
```

### Phase 5 — First Content

```text
사성제
팔정도
연기
무상
무아
육바라밀
```

### Phase 6 — Home

질문 기반 탐색 UI를 구현한다.

### Phase 7 — Search

metadata 기반 검색을 구현한다.

### Phase 8 — Visualization

첫 diagram을 구현한다.

추천:

```text
FourNobleTruthsDiagram
```

### Phase 9 — Concept Map

related metadata를 기반으로 관계 표현을 만든다.

---

# 71. First Development Task

Agent가 이 문서를 처음 받은 경우 바로 모든 기능을 한꺼번에 구현하지 않는다.

첫 작업 범위:

```text
1. Next.js + TypeScript + Tailwind 프로젝트 구조 구성
2. MDX 콘텐츠 pipeline 구축
3. Concept frontmatter schema 정의
4. /concepts/[slug] 정적 route 구현
5. 기본 article typography 구현
6. ConceptSummary 구현
7. ExampleCard 구현
8. ImageWithCaption 구현
9. RelatedConcepts 구현
10. 연기(dependent-origination) 샘플 페이지 작성
```

이 단계가 정상 동작하면 다음 기능으로 진행한다.

---

# 72. First Vertical Slice

첫 번째 완성형 페이지는 `연기`를 사용한다.

URL:

```text
/concepts/dependent-origination
```

페이지에는 최소한 다음 요소가 존재해야 한다.

```text
연기
緣起
Dependent Origination

한 문장 설명

30초 설명

쉬운 설명

일상 예시

이미지 또는 시각적 설명

흔한 오해

무상 / 무아와의 관계

관련 개념
```

이 페이지 하나를 통해 전체 콘텐츠 시스템의 디자인을 검증한다.

---

# 73. Important Architectural Decision

이 프로젝트는 다음 구조를 핵심 원칙으로 한다.

```text
MDX
=
지식과 이야기

React Components
=
시각적 설명

Frontmatter
=
지식의 구조

Next.js
=
탐색과 전달
```

MDX를 단순 텍스트 저장소로 생각하지 않는다.

---

# 74. Key Differentiator

법의 지도는 또 하나의 불교 백과사전이 되는 것을 목표로 하지 않는다.

핵심 차별점은:

```text
어려운 개념
+
쉬운 설명
+
일상적인 사례
+
시각적 표현
+
개념 간 연결
```

이다.

Wikipedia가:

```text
"이것은 무엇인가?"
```

를 잘 설명한다면,

법의 지도는:

```text
"그래서 이게 무슨 뜻이지?"

"왜 중요한 거지?"

"내가 이해할 수 있는 예는 뭐지?"

"이 개념은 다른 개념과 어떻게 연결되지?"
```

에 답하는 것을 목표로 한다.

---

# 75. Long-Term Product Direction

장기적으로 사용자가 법의 지도에서 경험해야 할 것은 개별 문서가 아니라 **하나의 연결된 불교 지식 세계를 탐험하는 경험**이다.

예를 들어 사용자가:

```text
괴로움
```

에서 시작해서:

```text
괴로움
↓
사성제
↓
갈애
↓
집착
↓
연기
↓
무상
↓
무아
```

로 자연스럽게 이동할 수 있어야 한다.

따라서 모든 콘텐츠 개발에서 항상 다음 질문을 고려한다.

> 이 개념을 이해한 사용자는 다음에 무엇이 궁금해질까?

법의 지도의 정보 구조와 UI는 이 질문을 중심으로 발전시킨다.

---

# Final Product Statement

**법의 지도(Dhamma Map)는 불교의 어려운 개념을 일상의 언어와 사례, 시각적 설명으로 풀어내고 서로의 관계를 탐색할 수 있게 만드는 불교 지식 지도다.**

초기 버전은 서버나 계정 시스템 없이:

```text
Next.js
+
MDX
+
React Visualization
+
Vercel
```

이라는 단순한 구조로 시작한다.

제품이 성장하기 전까지 기술적 복잡성을 추가하지 않는다.

대신 가장 많은 노력을 다음 세 가지에 사용한다.

```text
좋은 설명
좋은 시각화
좋은 개념 연결
```

이 세 가지를 프로젝트의 최우선 가치로 둔다.
