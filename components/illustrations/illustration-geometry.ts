export type Point = { x: number; y: number };

/**
 * 선 끝에 붙일 화살촉(V자) 경로를 만든다.
 * previousPoint → tipPoint 방향을 기준으로 양쪽으로 벌어진 두 선을 그린다.
 */
export function createArrowheadPath(tipPoint: Point, previousPoint: Point, arrowheadLength = 12): string {
  const directionAngle = Math.atan2(tipPoint.y - previousPoint.y, tipPoint.x - previousPoint.x);
  const spreadAngle = Math.PI / 6;
  const leftWing = {
    x: tipPoint.x - arrowheadLength * Math.cos(directionAngle - spreadAngle),
    y: tipPoint.y - arrowheadLength * Math.sin(directionAngle - spreadAngle),
  };
  const rightWing = {
    x: tipPoint.x - arrowheadLength * Math.cos(directionAngle + spreadAngle),
    y: tipPoint.y - arrowheadLength * Math.sin(directionAngle + spreadAngle),
  };
  return `M ${leftWing.x.toFixed(1)} ${leftWing.y.toFixed(1)} L ${tipPoint.x} ${tipPoint.y} L ${rightWing.x.toFixed(1)} ${rightWing.y.toFixed(1)}`;
}
