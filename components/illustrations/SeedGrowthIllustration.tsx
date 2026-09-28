import { IllustrationFrame, type IllustrationProps } from "./IllustrationFrame";
import { createArrowheadPath } from "./illustration-geometry";

const rainDropPositions = [
  { x: 132, y: 150 },
  { x: 166, y: 170 },
  { x: 200, y: 150 },
  { x: 149, y: 196 },
  { x: 183, y: 214 },
];

const sunRayAngles = [0, 45, 90, 135, 180, 225, 270, 315];

/** 햇빛·비·흙에서 새싹으로 향하는 점선. 끝점은 잎과 겹치지 않도록 잎 바깥에 둔다. */
const conditionFlows = [
  { path: "M 590 140 C 560 190, 520 220, 482 230", tip: { x: 482, y: 230 }, previous: { x: 520, y: 220 } },
  { path: "M 205 250 C 250 262, 290 258, 318 250", tip: { x: 318, y: 250 }, previous: { x: 290, y: 258 } },
  { path: "M 280 374 C 312 366, 344 362, 374 364", tip: { x: 374, y: 364 }, previous: { x: 344, y: 362 } },
];

/** 연기: 햇빛·비·흙이라는 조건이 모여 씨앗이 싹을 틔우는 장면. */
export function SeedGrowthIllustration({ caption }: IllustrationProps) {
  const sunCenter = { x: 640, y: 96 };

  return (
    <IllustrationFrame
      caption={caption}
      description="해와 비구름, 흙 속의 씨앗이 그려져 있고, 해와 비에서 뻗어 나온 점선이 흙 위로 돋아난 새싹으로 모인다."
    >
      {/* 해 */}
      <g>
        {sunRayAngles.map((sunRayAngle) => {
          const radians = (sunRayAngle * Math.PI) / 180;
          return (
            <line
              key={sunRayAngle}
              x1={sunCenter.x + Math.cos(radians) * 56}
              y1={sunCenter.y + Math.sin(radians) * 56}
              x2={sunCenter.x + Math.cos(radians) * 72}
              y2={sunCenter.y + Math.sin(radians) * 72}
              strokeWidth={6}
              strokeLinecap="round"
              className="stroke-illustration-sun"
            />
          );
        })}
        <circle cx={sunCenter.x} cy={sunCenter.y} r={42} className="fill-illustration-sun" />
      </g>

      {/* 비구름과 빗방울 */}
      <g>
        <circle cx={130} cy={104} r={30} className="fill-illustration-object" />
        <circle cx={170} cy={86} r={40} className="fill-illustration-object" />
        <circle cx={212} cy={104} r={30} className="fill-illustration-object" />
        <rect x={100} y={104} width={142} height={30} rx={15} className="fill-illustration-object" />
        {rainDropPositions.map((rainDropPosition) => (
          <line
            key={`${rainDropPosition.x}-${rainDropPosition.y}`}
            x1={rainDropPosition.x}
            y1={rainDropPosition.y}
            x2={rainDropPosition.x - 4}
            y2={rainDropPosition.y + 16}
            strokeWidth={5}
            strokeLinecap="round"
            className="stroke-illustration-water"
          />
        ))}
      </g>

      {/* 흙 */}
      <path
        d="M 0 300 C 120 290, 240 306, 400 298 S 680 290, 800 300 L 800 450 L 0 450 Z"
        className="fill-illustration-ground"
      />
      <path
        d="M 0 390 C 160 380, 300 396, 460 388 S 700 380, 800 392 L 800 450 L 0 450 Z"
        className="fill-illustration-ground-deep"
      />
      <g className="fill-illustration-ground-deep">
        <circle cx={250} cy={340} r={4} />
        <circle cx={300} cy={362} r={3} />
        <circle cx={520} cy={336} r={4} />
        <circle cx={566} cy={360} r={3} />
        <circle cx={610} cy={330} r={3} />
      </g>

      {/* 씨앗과 뿌리 */}
      <g fill="none" strokeWidth={3} strokeLinecap="round" className="stroke-illustration-wood-deep">
        <path d="M 400 360 C 398 378, 392 392, 380 404" />
        <path d="M 404 360 C 410 376, 420 386, 432 394" />
        <path d="M 401 362 C 402 380, 404 396, 402 414" />
      </g>
      <ellipse cx={402} cy={352} rx={20} ry={13} className="fill-illustration-wood" />

      {/* 새싹 */}
      <path
        d="M 402 342 C 400 310, 404 280, 400 246"
        fill="none"
        strokeWidth={7}
        strokeLinecap="round"
        className="stroke-illustration-leaf"
      />
      <path d="M 400 256 C 370 226, 340 232, 330 244 C 350 262, 380 266, 400 256 Z" className="fill-illustration-leaf" />
      <path d="M 401 246 C 424 212, 458 210, 472 222 C 456 246, 424 254, 401 246 Z" className="fill-illustration-leaf" />

      {/* 조건이 새싹으로 모이는 점선 (맨 위에 그린다) */}
      <g fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="stroke-illustration-line">
        {conditionFlows.map((conditionFlow) => (
          <g key={conditionFlow.path}>
            <path d={conditionFlow.path} strokeDasharray="2 10" />
            <path d={createArrowheadPath(conditionFlow.tip, conditionFlow.previous)} />
          </g>
        ))}
      </g>
    </IllustrationFrame>
  );
}
