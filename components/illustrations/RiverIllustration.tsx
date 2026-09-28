import { IllustrationFrame, illustrationWidth, type IllustrationProps } from "./IllustrationFrame";

const samplingStep = 10;

function waterTopEdge(x: number): number {
  return 165 + 19 * Math.sin(x / 130) + 7 * Math.sin(x / 45 + 1.3);
}

function waterBottomEdge(x: number): number {
  return 315 + 17 * Math.sin(x / 150 + 1) + 5 * Math.sin(x / 55);
}

function sampleEdge(edgeFunction: (x: number) => number, verticalOffset = 0): [number, number][] {
  const sampledPoints: [number, number][] = [];
  for (let x = 0; x <= illustrationWidth; x += samplingStep) {
    sampledPoints.push([x, edgeFunction(x) + verticalOffset]);
  }
  return sampledPoints;
}

function toLinePath(points: [number, number][]): string {
  return points.map(([x, y], pointIndex) => `${pointIndex === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`).join(" ");
}

function toClosedBandPath(upperPoints: [number, number][], lowerPoints: [number, number][]): string {
  const reversedLowerPath = [...lowerPoints]
    .reverse()
    .map(([x, y]) => `L${x} ${y.toFixed(1)}`)
    .join(" ");
  return `${toLinePath(upperPoints)} ${reversedLowerPath} Z`;
}

const flowLineCount = 8;

/** 무상: 같은 강처럼 보이지만 물은 계속 흘러가는 모습. 떠내려가는 나뭇잎으로 흐름을 보여준다. */
export function RiverIllustration({ caption }: IllustrationProps) {
  const upperBankPoints = sampleEdge(waterTopEdge, -20);
  const lowerBankPoints = sampleEdge(waterBottomEdge, 17);
  const waterTopPoints = sampleEdge(waterTopEdge);
  const waterBottomPoints = sampleEdge(waterBottomEdge);

  const flowLines = Array.from({ length: flowLineCount }, (_, flowLineIndex) => {
    const depthRatio = (flowLineIndex + 1) / (flowLineCount + 1);
    const flowPoints = sampleEdge(
      (x) =>
        waterTopEdge(x) +
        (waterBottomEdge(x) - waterTopEdge(x)) * depthRatio +
        3 * Math.sin(x / 35 + flowLineIndex),
    );
    return { flowLineIndex, path: toLinePath(flowPoints) };
  });

  const leafX = 520;
  const leafY = waterTopEdge(leafX) + (waterBottomEdge(leafX) - waterTopEdge(leafX)) * 0.45;

  return (
    <IllustrationFrame
      caption={caption}
      description="왼쪽에서 오른쪽으로 굽이쳐 흐르는 강. 물결 무늬가 흐르고, 나뭇잎 하나가 물 위에 떠내려간다."
    >
      <rect width="100%" height="100%" className="fill-illustration-land" />
      <path d={toClosedBandPath(upperBankPoints, lowerBankPoints)} className="fill-illustration-sky" />
      <path d={toClosedBandPath(waterTopPoints, waterBottomPoints)} className="fill-illustration-water" />

      <g fill="none" strokeLinecap="round" className="stroke-illustration-water-light">
        {flowLines.map(({ flowLineIndex, path }) => (
          <path
            key={flowLineIndex}
            d={path}
            strokeWidth={flowLineIndex % 2 === 0 ? 1.5 : 2}
            strokeDasharray={`${55 + flowLineIndex * 7} ${35 + flowLineIndex * 6}`}
            strokeDashoffset={flowLineIndex * 29}
            opacity={0.25 + (flowLineIndex % 3) * 0.12}
          />
        ))}
      </g>

      {/* 떠내려가는 나뭇잎과 그 뒤의 물결 자국 */}
      <g fill="none" strokeWidth={2} strokeLinecap="round" className="stroke-illustration-water-light" opacity={0.8}>
        <path d={`M ${leafX - 96} ${leafY - 12} Q ${leafX - 66} ${leafY - 4} ${leafX - 38} ${leafY - 6}`} />
        <path d={`M ${leafX - 100} ${leafY + 14} Q ${leafX - 68} ${leafY + 8} ${leafX - 36} ${leafY + 8}`} />
      </g>
      <g transform={`translate(${leafX} ${leafY}) rotate(-12) scale(1.7)`}>
        <path d="M -18 0 C -8 -12, 12 -12, 20 0 C 12 10, -8 10, -18 0 Z" className="fill-illustration-leaf" />
        <path d="M -16 0 L 18 0" strokeWidth={1.5} className="stroke-illustration-sky" />
      </g>
    </IllustrationFrame>
  );
}
