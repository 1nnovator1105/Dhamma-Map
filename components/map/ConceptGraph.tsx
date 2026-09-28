import type { ConceptRelation } from "@/lib/content/concepts";

export type ConceptGraphNode = {
  slug: string;
  title: string;
  hanja?: string;
};

type ConceptGraphProps = {
  nodes: ConceptGraphNode[];
  relations: ConceptRelation[];
};

const viewBoxWidth = 640;
const viewBoxHeight = 600;
const layoutCenterX = viewBoxWidth / 2;
const layoutCenterY = viewBoxHeight / 2;
const layoutRadius = 225;
const nodeRadius = 56;

type PositionedNode = ConceptGraphNode & { x: number; y: number };

/** 개념을 원 둘레에 같은 간격으로 배치한다. 첫 개념이 12시 방향에 온다. */
function placeNodesOnCircle(nodes: ConceptGraphNode[]): PositionedNode[] {
  return nodes.map((node, nodeIndex) => {
    const angleInRadians = (nodeIndex / nodes.length) * Math.PI * 2 - Math.PI / 2;
    return {
      ...node,
      x: layoutCenterX + Math.cos(angleInRadians) * layoutRadius,
      y: layoutCenterY + Math.sin(angleInRadians) * layoutRadius,
    };
  });
}

/**
 * 개념 관계 지도 (base_spec 27·28절의 첫 버전).
 * 복잡한 force layout 대신, 원형 배치 + frontmatter related 기반 연결선으로 단순하게 그린다.
 * JavaScript 없이 서버에서 SVG로 렌더링된다.
 */
export function ConceptGraph({ nodes, relations }: ConceptGraphProps) {
  const positionedNodes = placeNodesOnCircle(nodes);
  const nodesBySlug = new Map(positionedNodes.map((node) => [node.slug, node]));

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className="mx-auto h-auto w-full max-w-[640px]"
      aria-labelledby="concept-graph-title"
    >
      <title id="concept-graph-title">불교 개념 사이의 연결 지도</title>

      <g aria-hidden="true">
        {relations.map((relation) => {
          const sourceNode = nodesBySlug.get(relation.sourceSlug);
          const targetNode = nodesBySlug.get(relation.targetSlug);
          if (!sourceNode || !targetNode) return null;
          return (
            <line
              key={`${relation.sourceSlug}-${relation.targetSlug}`}
              x1={sourceNode.x}
              y1={sourceNode.y}
              x2={targetNode.x}
              y2={targetNode.y}
              className="stroke-border-strong"
              strokeWidth={2}
            />
          );
        })}
      </g>

      {positionedNodes.map((node) => (
        <a
          key={node.slug}
          href={`/concepts/${node.slug}`}
          aria-label={`${node.title} 문서로 이동`}
          className="group outline-none"
        >
          <circle
            cx={node.x}
            cy={node.y}
            r={nodeRadius}
            strokeWidth={2}
            className="fill-surface-raised stroke-border-strong transition-colors group-hover:stroke-accent group-focus-visible:stroke-accent group-focus-visible:[stroke-width:4]"
          />
          <text
            x={node.x}
            y={node.hanja ? node.y + 2 : node.y + 8}
            textAnchor="middle"
            className="fill-foreground text-[24px] font-bold group-hover:fill-accent"
          >
            {node.title}
          </text>
          {node.hanja ? (
            <text
              x={node.x}
              y={node.y + 26}
              textAnchor="middle"
              className="hanja fill-muted text-[15px]"
            >
              {node.hanja}
            </text>
          ) : null}
        </a>
      ))}
    </svg>
  );
}
