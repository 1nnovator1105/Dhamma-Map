import { IllustrationFrame, type IllustrationProps } from "./IllustrationFrame";

/** 사성제 예시: 떨어뜨려 모서리에 흠집이 난 새 휴대폰. */
export function ScratchedPhoneIllustration({ caption }: IllustrationProps) {
  return (
    <IllustrationFrame
      caption={caption}
      description="바닥에 비스듬히 놓인 새 휴대폰. 오른쪽 위 모서리에 금이 간 흠집이 있고, 그 주변에 부딪힌 자국을 나타내는 짧은 선들이 있다."
    >
      <ellipse cx={400} cy={392} rx={210} ry={20} className="fill-illustration-land-deep" />

      <g transform="translate(400 222) rotate(-14)">
        <rect x={-92} y={-168} width={184} height={336} rx={30} className="fill-illustration-device" />
        <rect x={-80} y={-150} width={160} height={300} rx={20} className="fill-illustration-water" opacity={0.85} />
        <circle cx={0} cy={-156} r={4} className="fill-illustration-sky" opacity={0.5} />
        {/* 화면 속 단순한 배경 무늬 */}
        <circle cx={-18} cy={-40} r={46} className="fill-illustration-water-light" opacity={0.25} />
        <circle cx={34} cy={40} r={62} className="fill-illustration-water-light" opacity={0.18} />

        {/* 모서리의 흠집 */}
        <path
          d="M 88 -140 L 62 -126 L 70 -112 L 44 -100 M 62 -126 L 56 -146"
          fill="none"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-illustration-water-light"
        />
      </g>

      {/* 부딪힌 자국 */}
      <g fill="none" strokeWidth={4} strokeLinecap="round" className="stroke-illustration-sun">
        <path d="M 540 52 L 556 32" />
        <path d="M 566 76 L 590 68" />
        <path d="M 516 44 L 514 22" />
      </g>
    </IllustrationFrame>
  );
}
