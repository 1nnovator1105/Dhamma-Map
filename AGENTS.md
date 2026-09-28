# 법의 지도 (Dhamma Map) — Agent 작업 규칙

이 문서는 이 저장소에서 작업하는 모든 AI Agent가 따라야 할 규칙이다.
제품 방향, 기술 스택, 콘텐츠 원칙의 기준 문서는 [`docs/spec/base_spec.md`](./docs/spec/base_spec.md)이며,
이 문서의 규칙은 그 위에 추가로 적용된다.

---

## 1. 언어

- 사용자에게 하는 **모든 응답은 반드시 한국어**로 작성한다.
- 서비스의 모든 콘텐츠(MDX 본문, frontmatter의 `title`·`summary`, UI 문구, 메타데이터 description 등)는
  **대한민국 사용자**를 대상으로 한국어로 작성한다.

## 2. 콘텐츠 대상 — 대한민국 사용자

- 불교 용어는 한국 불교에서 통용되는 한글 용어를 우선한다 (예: 연기, 무상, 무아, 사성제, 팔정도).
- 한자를 병기하고, 필요하면 영어·산스크리트어·팔리어를 보조로 표기한다.
- 일상 예시는 한국 사용자에게 익숙한 생활 맥락에서 가져온다 (직장, 학교, 가족, 출퇴근 등).
- 참고 자료는 가능하면 한국어로 접근 가능한 자료(한역 경전, 국내 번역본, 국내 학술 자료)를 함께 제시한다.

## 3. 코드 네이밍 — 유지보수 가능한 이름

지나치게 축약된 변수명·함수명을 사용하지 않는다. 이름만 읽어도 무엇을 담는지, 무엇을 하는지 알 수 있어야 한다.

| 피해야 할 이름 | 사용할 이름 |
|---|---|
| `c`, `cpt`, `item` | `concept` |
| `rel`, `rels` | `relatedConcept`, `relatedConceptSlugs` |
| `fm`, `meta` | `frontmatter`, `conceptMetadata` |
| `getC()`, `load()` | `getConceptBySlug()`, `loadAllConceptMetadata()` |
| `idx`, `res` | `searchIndex`, `searchResults` |
| `cfg`, `opts` | `mdxCompileOptions` |

- 관례적으로 굳어진 짧은 이름(`i` 반복 인덱스, `props`, `children`, `id`, `url` 등)은 허용한다.
- 불리언은 `is`/`has`/`should` 접두사를 사용한다 (예: `isDraft`, `hasRelatedConcepts`).
- 함수명은 동사로 시작한다 (예: `validateConceptFrontmatter`, `buildSearchIndex`).

## 4. slug (페이지 URL) 규칙

- slug는 **해당 불교 개념의 표준 영문 번역어**를 찾아 kebab-case로 사용한다.
- 한글 로마자 표기(`yeongi`, `musang`)나 한글 slug는 사용하지 않는다.
- 학계·영문 불교 문헌에서 널리 쓰이는 번역어를 우선한다. 번역어가 여러 개면 가장 보편적인 것을 고른다.

| 개념 | slug |
|---|---|
| 연기 | `dependent-origination` |
| 무상 | `impermanence` |
| 무아 | `non-self` |
| 사성제 | `four-noble-truths` |
| 팔정도 | `noble-eightfold-path` |
| 육바라밀 | `six-paramitas` |

- 한 번 정한 slug는 URL이 되므로 가급적 바꾸지 않는다. 다른 표기(예: `anatta`, `no-self`)는
  frontmatter의 `english` 또는 `aliases`에 넣어 검색으로 찾을 수 있게 한다.

## 5. MDX 작성 시 주의

- 문서 작성 방법과 사용할 수 있는 컴포넌트는 [`README.md`](./README.md)의 "콘텐츠 작성하기"를 따른다.
- 굵은 글씨가 괄호나 따옴표로 끝나고 바로 조사가 붙으면 마크다운 `**…**`가 닫히지 않는다.
  이때는 띄어 쓰지 말고 `<strong>무아(無我)</strong>입니다`처럼 `<strong>`을 쓴다.
- 작성 후 `npm run build`로 frontmatter와 문서 간 연결(related) 검증을 통과하는지 확인한다.

---

## 6. Next.js 버전 주의 (next dev가 자동 관리하는 블록)

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
