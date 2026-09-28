# 삽화 스타일 가이드

법의 지도의 삽화는 **장식이 아니라 설명**을 위한 것이다 (base_spec 42절).
모든 삽화는 본문에 이미 있는 비유나 예시 하나를 그림으로 옮긴다. 본문에 없는 비유를 그림으로 새로 만들지 않는다.

## 형식

- **코드로 그린 인라인 SVG React 컴포넌트**로 만든다. 위치: `components/illustrations/<이름>Illustration.tsx`
- 틀은 `IllustrationFrame`을 쓴다. 16:9, `viewBox="0 0 800 450"`, 둥근 모서리와 테두리가 자동으로 붙는다.
- 만든 컴포넌트는 `components/content/mdx-components.tsx`에 등록해야 MDX에서 쓸 수 있다.
- MDX 사용 예: `<RiverIllustration caption="같은 강처럼 보여도 그 안의 물은 계속 변하고 있습니다." />`
  - `caption`(그림이 본문에서 뜻하는 것)은 콘텐츠이므로 MDX에서 적는다.
  - 대체 텍스트(그림에 무엇이 그려져 있는지)는 그림과 함께 바뀌므로 컴포넌트의 `description`에 적는다.

## 색상

- 색상 값을 직접 쓰지 않는다. `fill-illustration-*`, `stroke-illustration-*` 토큰 클래스만 쓴다
  (`app/globals.css`에 라이트·다크 값이 함께 정의되어 있다).
- 토큰: `sky`(배경) · `land` · `land-deep` · `ground` · `ground-deep` · `water` · `water-deep` · `water-light`
  · `leaf` · `sun` · `wood` · `wood-deep` · `device` · `object` · `line`
- 어두운 배경 위에서 밝게 보여야 하는 선·면(돛, 흠집, 화살표 등)은 `water-light`를 쓴다.
  `object`는 다크 모드에서 어두워지므로 강조용으로 쓰지 않는다.
- 새 삽화는 **라이트·다크 두 모드에서 모두** 확인한다.

## 그림 규칙

- 평면(flat) 스타일. 그라디언트, 그림자 효과, 사진 질감을 쓰지 않는다.
- 선 끝은 둥글게(`strokeLinecap="round"`). 주요 선 굵기 3~8.
- **글자를 넣지 않는다.** 설명은 캡션이 맡는다.
  예외: 메신저의 읽지 않음 표시 '1'처럼 장면을 이해하는 데 꼭 필요한 기호.
- **종교적 상투 이미지 금지**: 불상, 연꽃, 사찰, 향, 금색 장식, 한지 질감 (base_spec 32절).
- 일상 장면은 한국 사용자에게 익숙한 맥락(휴대폰, 메신저, 직장 등)에서 가져온다.
- 흐름·방향은 점선과 화살촉으로 표현한다 (`createArrowheadPath` 사용).
- 색상만으로 의미를 구분하지 않는다. 색이 다른 요소의 의미는 캡션이나 본문에서 설명한다.

## 현재 삽화

| 컴포넌트 | 문서 | 그리는 것 |
|---|---|---|
| `SeedGrowthIllustration` | 연기 | 햇빛·비·흙이 모여 싹이 트는 씨앗 |
| `ConditionsIllustration` | 연기 | 여러 조건이 하나의 결과로 모이는 추상 그림 |
| `RiverIllustration` | 무상 | 흘러가는 강과 떠내려가는 나뭇잎 |
| `ChariotPartsIllustration` | 무아, 주제: 무아는 내가 없다는 뜻일까? | 흩어진 부품과 모인 수레 (밀린다왕문경) |
| `BoatCrossingIllustration` | 육바라밀 | 저 언덕으로 건너가는 배 (到彼岸) |
| `ConvergingPathsIllustration` | 팔정도 | 세 갈래(지혜·계·정)가 하나로 모이는 길 |
| `ScratchedPhoneIllustration` | 사성제 (예시 카드) | 모서리에 흠집이 난 새 휴대폰 |
| `UnreadMessageIllustration` | 주제: 집착은 왜 괴로움을 만들까? (예시 카드) | 사라지지 않는 읽지 않음 '1' |
