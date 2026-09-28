import { IllustrationFrame, type IllustrationProps } from "./IllustrationFrame";

type MessageBubble = {
  isSentByMe: boolean;
  y: number;
  width: number;
  lineCount: number;
};

const messageBubbles: MessageBubble[] = [
  { isSentByMe: false, y: 92, width: 120, lineCount: 1 },
  { isSentByMe: true, y: 150, width: 140, lineCount: 2 },
  { isSentByMe: true, y: 232, width: 96, lineCount: 1 },
];

const phoneLeftX = 290;
const phoneWidth = 220;
const bubbleLineHeight = 16;
const bubblePadding = 14;

/**
 * 집착 주제 예시: 보낸 메시지 옆의 '읽지 않음' 숫자 1이 사라지지 않는 장면.
 * 숫자 1은 한국 메신저에서 널리 쓰이는 표시라 글자 없는 삽화 원칙의 예외로 둔다.
 */
export function UnreadMessageIllustration({ caption }: IllustrationProps) {
  const screenLeftX = phoneLeftX + 12;
  const screenRightX = phoneLeftX + phoneWidth - 12;
  const lastBubble = messageBubbles[messageBubbles.length - 1];

  return (
    <IllustrationFrame
      caption={caption}
      description="휴대폰 메신저 화면. 내가 보낸 말풍선 옆에 읽지 않았다는 뜻의 숫자 1이 떠 있고, 휴대폰 옆에는 시간이 흐르고 있음을 뜻하는 시계가 있다."
    >
      {/* 휴대폰 */}
      <rect x={phoneLeftX} y={24} width={phoneWidth} height={402} rx={32} className="fill-illustration-device" />
      <rect x={screenLeftX} y={40} width={phoneWidth - 24} height={370} rx={22} className="fill-illustration-object" />

      {messageBubbles.map((messageBubble) => {
        const bubbleHeight = messageBubble.lineCount * bubbleLineHeight + bubblePadding * 2 - 6;
        const bubbleX = messageBubble.isSentByMe ? screenRightX - 14 - messageBubble.width : screenLeftX + 14;
        return (
          <g key={messageBubble.y}>
            <rect
              x={bubbleX}
              y={messageBubble.y}
              width={messageBubble.width}
              height={bubbleHeight}
              rx={14}
              className={messageBubble.isSentByMe ? "fill-illustration-sun" : "fill-illustration-land"}
            />
            {Array.from({ length: messageBubble.lineCount }, (_, lineIndex) => (
              <rect
                key={lineIndex}
                x={bubbleX + 14}
                y={messageBubble.y + bubblePadding + lineIndex * bubbleLineHeight - 3}
                width={messageBubble.width - 28 - (lineIndex === messageBubble.lineCount - 1 ? 24 : 0)}
                height={7}
                rx={3.5}
                className="fill-illustration-device"
                opacity={0.25}
              />
            ))}
          </g>
        );
      })}

      {/* 사라지지 않는 '1' */}
      <text
        x={screenRightX - 14 - lastBubble.width - 18}
        y={lastBubble.y + 34}
        textAnchor="middle"
        className="fill-illustration-sun text-[30px] font-bold"
      >
        1
      </text>

      {/* 입력창 */}
      <rect x={screenLeftX + 12} y={362} width={phoneWidth - 48} height={32} rx={16} className="fill-illustration-land" />

      {/* 흐르는 시간 */}
      <g transform="translate(628 150)">
        <circle r={54} strokeWidth={6} className="fill-illustration-object stroke-illustration-line" />
        <path d="M 0 0 L 0 -32 M 0 0 L 22 12" fill="none" strokeWidth={6} strokeLinecap="round" className="stroke-illustration-line" />
        <circle r={5} className="fill-illustration-line" />
        <path d="M 40 -70 A 80 80 0 0 1 78 -12" fill="none" strokeWidth={4} strokeLinecap="round" strokeDasharray="2 10" className="stroke-illustration-line" />
      </g>
    </IllustrationFrame>
  );
}
