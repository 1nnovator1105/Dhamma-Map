import "server-only";

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { cache } from "react";
import type { z } from "zod";

import type { ContentDocument } from "@/types/content";

import {
  conceptFrontmatterSchema,
  learningPathListSchema,
  topicFrontmatterSchema,
} from "./schemas";
import { findContentRelationProblems, formatContentProblems } from "./validation";

const contentRootDirectory = path.join(process.cwd(), "content");

const isProductionBuild = process.env.NODE_ENV === "production";

/** production에서는 초안을 노출하지 않고, 개발 환경에서는 '초안' 표시와 함께 보여준다 (base_spec 66절). */
export const shouldShowDraftDocuments = !isProductionBuild;

type FrontmatterSchema = z.ZodType<{ slug: string; draft: boolean }>;

/**
 * content/<directoryName>/*.mdx 를 읽고 frontmatter를 스키마로 검증한다.
 * 스키마 위반, slug-파일명 불일치, slug 중복은 개발·빌드 모두에서 즉시 오류로 처리한다.
 */
function readMdxDocumentsInDirectory<Schema extends FrontmatterSchema>(
  directoryName: string,
  frontmatterSchema: Schema,
): ContentDocument<z.infer<Schema>>[] {
  const directoryPath = path.join(contentRootDirectory, directoryName);
  const mdxFileNames = fs
    .readdirSync(directoryPath)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .sort();

  const validationErrors: string[] = [];
  const documents: ContentDocument<z.infer<Schema>>[] = [];
  const seenSlugs = new Set<string>();

  for (const fileName of mdxFileNames) {
    const sourceFilePath = path.join("content", directoryName, fileName);
    const rawFileContent = fs.readFileSync(path.join(directoryPath, fileName), "utf8");
    const { data: rawFrontmatter, content: mdxBody } = matter(rawFileContent);
    const parseResult = frontmatterSchema.safeParse(rawFrontmatter);

    if (!parseResult.success) {
      const issueDescriptions = parseResult.error.issues
        .map((issue) => `    - ${issue.path.join(".") || "(frontmatter)"}: ${issue.message}`)
        .join("\n");
      validationErrors.push(`  ${sourceFilePath}\n${issueDescriptions}`);
      continue;
    }

    const metadata = parseResult.data;
    const expectedSlug = fileName.replace(/\.mdx$/, "");
    if (metadata.slug !== expectedSlug) {
      validationErrors.push(
        `  ${sourceFilePath}\n    - slug: 파일명과 같아야 합니다 (현재 "${metadata.slug}", 기대값 "${expectedSlug}").`,
      );
      continue;
    }
    if (seenSlugs.has(metadata.slug)) {
      validationErrors.push(`  ${sourceFilePath}\n    - slug: "${metadata.slug}"가 중복됩니다.`);
      continue;
    }
    seenSlugs.add(metadata.slug);
    documents.push({ metadata, mdxBody, sourceFilePath });
  }

  if (validationErrors.length > 0) {
    throw new Error(
      `콘텐츠 frontmatter 검증에 실패했습니다 (content/${directoryName}):\n${validationErrors.join("\n")}`,
    );
  }

  return documents;
}

function readLearningPaths() {
  const learningPathsFilePath = path.join(contentRootDirectory, "learning-paths.json");
  const rawLearningPaths: unknown = JSON.parse(fs.readFileSync(learningPathsFilePath, "utf8"));
  const parseResult = learningPathListSchema.safeParse(rawLearningPaths);
  if (!parseResult.success) {
    throw new Error(`content/learning-paths.json 검증에 실패했습니다:\n${parseResult.error.message}`);
  }
  return parseResult.data;
}

const reportedProblemMessages = new Set<string>();

/**
 * 모든 콘텐츠를 한 번에 읽고 문서 간 연결을 검증한다.
 * 연결 오류는 production 빌드에서는 빌드를 실패시키고, 개발 환경에서는 경고만 출력해
 * 잘못된 related 하나 때문에 앱 전체가 멈추지 않게 한다 (base_spec 63절).
 */
export const loadContentRepository = cache(() => {
  const conceptDocuments = readMdxDocumentsInDirectory("concepts", conceptFrontmatterSchema);
  const topicDocuments = readMdxDocumentsInDirectory("topics", topicFrontmatterSchema);
  const learningPaths = readLearningPaths();

  const relationProblems = findContentRelationProblems({
    conceptDocuments,
    topicDocuments,
    learningPaths,
  });
  const relationErrors = relationProblems.filter((problem) => problem.severity === "error");

  if (isProductionBuild && relationErrors.length > 0) {
    throw new Error(`콘텐츠 연결 검증에 실패했습니다:\n${formatContentProblems(relationErrors)}`);
  }
  if (relationProblems.length > 0) {
    const formattedProblems = formatContentProblems(relationProblems);
    if (!reportedProblemMessages.has(formattedProblems)) {
      reportedProblemMessages.add(formattedProblems);
      console.warn(`[법의 지도] 콘텐츠 연결 점검 결과:\n${formattedProblems}`);
    }
  }

  const isVisible = (document: { metadata: { draft: boolean } }) =>
    shouldShowDraftDocuments || !document.metadata.draft;

  return {
    conceptDocuments: conceptDocuments.filter(isVisible),
    topicDocuments: topicDocuments.filter(isVisible),
    learningPaths,
  };
});
