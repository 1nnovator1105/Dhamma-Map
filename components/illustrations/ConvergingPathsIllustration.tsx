import { IllustrationFrame, type IllustrationProps } from "./IllustrationFrame";

type PathLane = {
  /** 화면 아래쪽에서 길의 왼쪽·오른쪽 가장자리 x */
  startLeftX: number;
  startRightX: number;
  /** 세 길이 만나는 지점에서의 가장자리 x */
  mergeLeftX: number;
  mergeRightX: number;
  /** 지평선에서의 가장자리 x */
  horizonLeftX: number;
  horizonRightX: number;
  colorClassName: string;
};

const bottomY = 450;
const mergeY = 300;
const horizonY = 206;

/** 지혜·계·정 세 갈래. 만난 뒤에도 섞이지 않고 나란히 한 길을 이룬다. */
const pathLanes: PathLane[] = [
  {
    startLeftX: 50,
    startRightX: 190,
    mergeLeftX: 352,
    mergeRightX: 384,
    horizonLeftX: 395,
    horizonRightX: 398.4,
    colorClassName: "fill-illustration-water",
  },
  {
    startLeftX: 330,
    startRightX: 470,
    mergeLeftX: 384,
    mergeRightX: 416,
    horizonLeftX: 398.4,
    horizonRightX: 401.6,
    colorClassName: "fill-illustration-sun",
  },
  {
    startLeftX: 610,
    startRightX: 750,
    mergeLeftX: 416,
    mergeRightX: 448,
    horizonLeftX: 401.6,
    horizonRightX: 405,
    colorClassName: "fill-illustration-leaf",
  },
];

function createLanePath(pathLane: PathLane): string {
  return [
    `M ${pathLane.startLeftX} ${bottomY}`,
    `C ${pathLane.startLeftX} 380, ${pathLane.mergeLeftX} 340, ${pathLane.mergeLeftX} ${mergeY}`,
    `L ${pathLane.horizonLeftX} ${horizonY}`,
    `L ${pathLane.horizonRightX} ${horizonY}`,
    `L ${pathLane.mergeRightX} ${mergeY}`,
    `C ${pathLane.mergeRightX} 340, ${pathLane.startRightX} 380, ${pathLane.startRightX} ${bottomY}`,
    "Z",
  ].join(" ");
}

/** 팔정도: 세 갈래(지혜·계·정)의 길이 하나로 모여 함께 나아가는 모습. */
export function ConvergingPathsIllustration({ caption }: IllustrationProps) {
  return (
    <IllustrationFrame
      caption={caption}
      description="화면 아래 세 곳에서 출발한 세 가지 색의 길이 가운데로 모여, 나란히 붙은 채 지평선 너머까지 하나의 길로 이어진다."
    >
      <circle cx={400} cy={horizonY} r={46} className="fill-illustration-sun" opacity={0.35} />
      <path
        d={`M 0 ${horizonY} C 120 176, 240 186, 330 ${horizonY - 6} S 560 168, 800 ${horizonY - 4} L 800 ${horizonY} Z`}
        className="fill-illustration-land-deep"
      />
      <rect x={0} y={horizonY} width={800} height={450 - horizonY} className="fill-illustration-land" />

      {pathLanes.map((pathLane) => (
        <path key={pathLane.colorClassName} d={createLanePath(pathLane)} className={pathLane.colorClassName} />
      ))}

      <g fill="none" strokeWidth={3} strokeLinecap="round" className="stroke-illustration-land-deep">
        <path d="M 250 420 l 6 -14 l 6 14" />
        <path d="M 540 400 l 5 -12 l 5 12" />
        <path d="M 120 290 l 5 -12 l 5 12" />
        <path d="M 660 300 l 5 -12 l 5 12" />
        <path d="M 520 250 l 4 -9 l 4 9" />
      </g>
    </IllustrationFrame>
  );
}
