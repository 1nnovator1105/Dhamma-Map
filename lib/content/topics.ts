import "server-only";

import type { LearningPath, TopicDocument, TopicMetadata } from "@/types/content";

import { loadContentRepository } from "./repository";

const fallbackOrder = Number.MAX_SAFE_INTEGER;

export function getAllTopicDocuments(): TopicDocument[] {
  return [...loadContentRepository().topicDocuments].sort(
    (first, second) =>
      (first.metadata.order ?? fallbackOrder) - (second.metadata.order ?? fallbackOrder),
  );
}

export function getAllTopicMetadata(): TopicMetadata[] {
  return getAllTopicDocuments().map((topicDocument) => topicDocument.metadata);
}

export function getTopicDocumentBySlug(slug: string): TopicDocument | undefined {
  return getAllTopicDocuments().find((topicDocument) => topicDocument.metadata.slug === slug);
}

export function getLearningPathBySlug(slug: string): LearningPath | undefined {
  return loadContentRepository().learningPaths.find((learningPath) => learningPath.slug === slug);
}
