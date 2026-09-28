import { z } from "zod";

import { conceptCategories, conceptDifficulties } from "./taxonomy";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const slugSchema = z
  .string()
  .regex(slugPattern, "slug는 영문 소문자·숫자·하이픈(kebab-case)만 사용할 수 있습니다.");

/** 개념 문서 frontmatter (base_spec 15절). */
export const conceptFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: slugSchema,
  summary: z.string().min(1),
  category: z.array(z.enum(conceptCategories)).min(1),
  related: z.array(slugSchema),
  draft: z.boolean(),

  hanja: z.string().optional(),
  english: z.string().optional(),
  sanskrit: z.string().optional(),
  pali: z.string().optional(),
  tags: z.array(z.string()).optional(),
  aliases: z.array(z.string()).optional(),
  difficulty: z.enum(conceptDifficulties).optional(),
  order: z.number().optional(),
  /** 홈의 '무엇이 궁금한가요?' 영역에 노출할 질문. 없으면 홈에 노출하지 않는다. */
  question: z.string().optional(),
});

/** 질문 기반 주제 문서 frontmatter. related는 연결된 개념 slug 목록이다. */
export const topicFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: slugSchema,
  summary: z.string().min(1),
  related: z.array(slugSchema),
  draft: z.boolean(),
  order: z.number().optional(),
});

/** 학습 경로 (base_spec 59절). 개념 slug를 읽는 순서대로 나열한다. */
export const learningPathSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  conceptSlugs: z.array(slugSchema).min(1),
});

export const learningPathListSchema = z.array(learningPathSchema);
