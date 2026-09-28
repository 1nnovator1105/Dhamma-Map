import { IllustrationFrame, type IllustrationProps } from "./IllustrationFrame";
import { createArrowheadPath } from "./illustration-geometry";

type WheelProps = {
  centerX: number;
  centerY: number;
  radius: number;
};

const spokeAngles = [0, 30, 60, 90, 120, 150];

function Wheel({ centerX, centerY, radius }: WheelProps) {
  return (
    <g className="stroke-illustration-wood-deep" fill="none" strokeLinecap="round">
      {spokeAngles.map((spokeAngle) => {
        const radians = (spokeAngle * Math.PI) / 180;
        return (
          <line
            key={spokeAngle}
            x1={centerX - Math.cos(radians) * radius}
            y1={centerY - Math.sin(radians) * radius}
            x2={centerX + Math.cos(radians) * radius}
            y2={centerY + Math.sin(radians) * radius}
            strokeWidth={4}
          />
        );
      })}
      <circle cx={centerX} cy={centerY} r={radius} strokeWidth={8} />
      <circle cx={centerX} cy={centerY} r={radius * 0.18} strokeWidth={0} className="fill-illustration-wood-deep" />
    </g>
  );
}

type CartBodyProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

function CartBody({ x, y, width, height }: CartBodyProps) {
  const plankCount = 3;
  return (
    <g>
      <path
        d={`M ${x} ${y} L ${x + width} ${y} L ${x + width - 14} ${y + height} L ${x + 14} ${y + height} Z`}
        strokeWidth={4}
        strokeLinejoin="round"
        className="fill-illustration-wood stroke-illustration-wood-deep"
      />
      {Array.from({ length: plankCount - 1 }, (_, plankIndex) => {
        const plankY = y + ((plankIndex + 1) * height) / plankCount;
        const inset = (14 * (plankIndex + 1)) / plankCount;
        return (
          <line
            key={plankIndex}
            x1={x + inset + 4}
            y1={plankY}
            x2={x + width - inset - 4}
            y2={plankY}
            strokeWidth={3}
            className="stroke-illustration-wood-deep"
            opacity={0.6}
          />
        );
      })}
    </g>
  );
}

/**
 * 무아: 『밀린다왕문경』의 수레 비유.
 * 왼쪽에는 흩어진 부품(바퀴 둘, 굴대, 차체, 끌채), 오른쪽에는 그 부품이 모여 '수레'라 불리는 모습.
 */
export function ChariotPartsIllustration({ caption }: IllustrationProps) {
  return (
    <IllustrationFrame
      caption={caption}
      description="왼쪽에 바퀴 두 개, 굴대, 차체, 끌채가 따로 흩어져 있고, 화살표 오른쪽에는 이 부품들이 합쳐진 수레 한 대가 있다."
    >
      <line x1={470} y1={372} x2={770} y2={372} strokeWidth={2} strokeLinecap="round" className="stroke-illustration-line" opacity={0.4} />

      {/* 흩어진 부품 */}
      <Wheel centerX={108} centerY={300} radius={52} />
      <Wheel centerX={214} centerY={318} radius={46} />
      <rect x={70} y={196} width={220} height={14} rx={7} className="fill-illustration-wood-deep" />
      <CartBody x={96} y={92} width={180} height={62} />
      <rect
        x={-6}
        y={-110}
        width={12}
        height={220}
        rx={6}
        transform="translate(322 250) rotate(20)"
        className="fill-illustration-wood"
      />

      {/* 모으면 */}
      <g fill="none" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" className="stroke-illustration-line">
        <path d="M 378 232 L 438 232" />
        <path d={createArrowheadPath({ x: 446, y: 232 }, { x: 378, y: 232 }, 18)} />
      </g>

      {/* 모인 수레 (옆모습: 앞쪽 바퀴만 보인다) */}
      <rect
        x={-4}
        y={-4}
        width={96}
        height={10}
        rx={5}
        transform="translate(686 246) rotate(14)"
        className="fill-illustration-wood"
      />
      <CartBody x={500} y={198} width={200} height={70} />
      <Wheel centerX={600} centerY={306} radius={62} />
    </IllustrationFrame>
  );
}
