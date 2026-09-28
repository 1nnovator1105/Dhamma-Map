import { IllustrationFrame, type IllustrationProps } from "./IllustrationFrame";
import { createArrowheadPath } from "./illustration-geometry";

const waveStartPoints = [
  { x: 190, y: 300 },
  { x: 470, y: 336 },
  { x: 250, y: 372 },
  { x: 520, y: 404 },
  { x: 150, y: 424 },
  { x: 380, y: 430 },
];

/** 육바라밀: '저 언덕에 건너간다(到彼岸)'는 바라밀의 뜻을 강을 건너는 배로 보여준다. */
export function BoatCrossingIllustration({ caption }: IllustrationProps) {
  return (
    <IllustrationFrame
      caption={caption}
      description="왼쪽의 가까운 강기슭에서 오른쪽의 나무가 있는 먼 강기슭으로, 돛단배 한 척이 강을 건너고 있다. 배 뒤에는 물결 자국이, 배 앞에는 건너편을 가리키는 점선 화살표가 있다."
    >
      {/* 먼 언덕 위의 해 */}
      <circle cx={600} cy={110} r={34} className="fill-illustration-sun" opacity={0.85} />

      {/* 물 */}
      <rect x={0} y={262} width={800} height={188} className="fill-illustration-water" />
      <g fill="none" strokeWidth={2} strokeLinecap="round" className="stroke-illustration-water-light" opacity={0.45}>
        {waveStartPoints.map((waveStartPoint) => (
          <path
            key={`${waveStartPoint.x}-${waveStartPoint.y}`}
            d={`M ${waveStartPoint.x} ${waveStartPoint.y} q 20 -8 40 0 t 40 0`}
          />
        ))}
      </g>

      {/* 이쪽 기슭 */}
      <path d="M 0 250 C 60 246, 130 256, 170 280 L 150 450 L 0 450 Z" className="fill-illustration-land-deep" />

      {/* 저쪽 기슭과 나무 */}
      <path d="M 800 200 C 720 196, 640 214, 600 262 L 610 450 L 800 450 Z" className="fill-illustration-land-deep" />
      <rect x={708} y={150} width={10} height={60} rx={4} className="fill-illustration-wood-deep" />
      <circle cx={713} cy={138} r={34} className="fill-illustration-leaf" />

      {/* 건너가는 길 */}
      <g fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="stroke-illustration-water-light">
        <path d="M 452 296 C 500 282, 548 276, 590 282" strokeDasharray="2 12" />
        <path d={createArrowheadPath({ x: 592, y: 282 }, { x: 552, y: 276 }, 14)} />
      </g>

      {/* 배 */}
      <g transform="translate(372 300)">
        <path d="M -8 -12 L -8 -112" strokeWidth={4} strokeLinecap="round" className="stroke-illustration-wood-deep" />
        <path d="M -2 -108 L 50 -24 L -2 -24 Z" className="fill-illustration-water-light" />
        <path d="M -62 -12 L 62 -12 L 44 16 L -44 16 Z" strokeLinejoin="round" className="fill-illustration-wood" />
        <path d="M -54 -2 L 54 -2" strokeWidth={2} className="stroke-illustration-wood-deep" opacity={0.6} />
      </g>
      <g fill="none" strokeWidth={2.5} strokeLinecap="round" className="stroke-illustration-water-light" opacity={0.8}>
        <path d="M 300 322 q -30 4 -56 -2" />
        <path d="M 306 332 q -34 8 -70 4" />
      </g>
    </IllustrationFrame>
  );
}
