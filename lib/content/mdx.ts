import "server-only";

import { evaluate } from "@mdx-js/mdx";
import type { ElementContent, Root, RootContent } from "hast";
import type { MDXContent } from "mdx/types";
import * as reactJsxRuntime from "react/jsx-runtime";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import type { TableOfContentsHeading } from "@/types/content";

type HastNode = Root | RootContent | ElementContent;

function extractPlainText(node: HastNode): string {
  if (node.type === "text") return node.value;
  if ("children" in node) {
    return node.children.map((childNode) => extractPlainText(childNode as HastNode)).join("");
  }
  return "";
}

/**
 * rehype-slug가 붙인 id를 그대로 사용해 h2·h3 목차를 모은다.
 * 목차의 링크와 실제 제목 id가 항상 일치하도록 slug 생성 이후에 실행한다.
 */
function rehypeCollectHeadings(collectedHeadings: TableOfContentsHeading[]) {
  return function collectHeadingsFromTree(tree: Root) {
    function visitNode(node: HastNode) {
      if (node.type === "element" && (node.tagName === "h2" || node.tagName === "h3")) {
        const headingId = node.properties?.id;
        if (typeof headingId === "string") {
          collectedHeadings.push({
            id: headingId,
            text: extractPlainText(node).trim(),
            depth: node.tagName === "h2" ? 2 : 3,
          });
        }
        return;
      }
      if ("children" in node) {
        for (const childNode of node.children) visitNode(childNode as HastNode);
      }
    }
    visitNode(tree);
  };
}

export type CompiledMdxDocument = {
  MdxContent: MDXContent;
  tableOfContents: TableOfContentsHeading[];
};

/**
 * MDX 본문을 빌드 타임에 React 컴포넌트로 컴파일한다 (Server Component 전용).
 * MDX 안에서 쓰는 컴포넌트는 렌더링 시 components prop으로 주입한다.
 */
export async function compileMdxDocument(mdxBody: string): Promise<CompiledMdxDocument> {
  const tableOfContents: TableOfContentsHeading[] = [];
  const { default: MdxContent } = await evaluate(mdxBody, {
    ...reactJsxRuntime,
    // 표, 취소선 등 GitHub 스타일 마크다운
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeCollectHeadings, tableOfContents]],
  });
  return { MdxContent, tableOfContents };
}
