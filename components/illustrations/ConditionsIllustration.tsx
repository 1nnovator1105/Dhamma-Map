import { IllustrationFrame, type IllustrationProps } from "./IllustrationFrame";

type ConditionNode = {
  angle: number;
  distance: number;
  radius: number;
  colorClassName: string;
};

const conditionNodes: ConditionNode[] = [
  { angle: -90, distance: 165, radius: 17, colorClassName: "fill-illustration-water" },
  { angle: -45, distance: 180, radius: 13, colorClassName: "fill-illustration-sun" },
  { angle: 0, distance: 190, radius: 20, colorClassName: "fill-illustration-line" },
  { angle: 45, distance: 175, radius: 14, colorClassName: "fill-illustration-water" },
  { angle: 90, distance: 160, radius: 16, colorClassName: "fill-illustration-sun" },
  { angle: 135, distance: 180, radius: 18, colorClassName: "fill-illustration-line" },
  { angle: 180, distance: 190, radius: 14, colorClassName: "fill-illustration-water" },
  { angle: 225, distance: 175, radius: 19, colorClassName: "fill-illustration-sun" },
];

/** 조건끼리도 서로 기대어 있음을 보여주는 보조 연결 (둘레의 원 사이). */
const conditionLinks: [number, number][] = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
  [1, 2],
  [5, 6],
];

/** 연기: 여러 조건(둘레의 원)이 하나의 결과(가운데 원)로 모이는 추상 그림. */
export function ConditionsIllustration({ caption }: IllustrationProps) {
  const center = { x: 400, y: 225 };
  const positionedNodes = conditionNodes.map((conditionNode) => {
    const radians = (conditionNode.angle * Math.PI) / 180;
    return {
      ...conditionNode,
      x: center.x + Math.cos(radians) * conditionNode.distance * 1.35,
      y: center.y + Math.sin(radians) * conditionNode.distance * 0.95,
    };
  });

  return (
    <IllustrationFrame
      caption={caption}
      description="가운데의 큰 원 하나를 여덟 개의 작은 원이 둘러싸고, 작은 원마다 가운데로 이어지는 곡선이 있다. 작은 원들끼리도 점선으로 이어져 있다."
    >
      <g strokeWidth={1.5} strokeDasharray="3 6" className="stroke-illustration-line" opacity={0.6}>
        {conditionLinks.map(([fromIndex, toIndex]) => (
          <line
            key={`${fromIndex}-${toIndex}`}
            x1={positionedNodes[fromIndex].x}
            y1={positionedNodes[fromIndex].y}
            x2={positionedNodes[toIndex].x}
            y2={positionedNodes[toIndex].y}
          />
        ))}
      </g>

      <g fill="none" strokeWidth={2} strokeLinecap="round" className="stroke-illustration-water-deep" opacity={0.7}>
        {positionedNodes.map((positionedNode) => {
          const controlX = (positionedNode.x + center.x) / 2 + (positionedNode.y - center.y) * 0.12;
          const controlY = (positionedNode.y + center.y) / 2 - (positionedNode.x - center.x) * 0.12;
          return (
            <path
              key={positionedNode.angle}
              d={`M ${positionedNode.x} ${positionedNode.y} Q ${controlX} ${controlY} ${center.x} ${center.y}`}
            />
          );
        })}
      </g>

      <circle cx={center.x} cy={center.y} r={75} className="fill-illustration-water-deep" opacity={0.12} />
      <circle cx={center.x} cy={center.y} r={50} className="fill-illustration-water-deep" />

      {positionedNodes.map((positionedNode) => (
        <g key={positionedNode.angle} className={positionedNode.colorClassName}>
          <circle cx={positionedNode.x} cy={positionedNode.y} r={positionedNode.radius + 6} opacity={0.2} />
          <circle cx={positionedNode.x} cy={positionedNode.y} r={positionedNode.radius} />
        </g>
      ))}
    </IllustrationFrame>
  );
}
