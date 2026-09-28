import type { MDXComponents } from "mdx/types";

import { DependentOriginationDiagram } from "@/components/diagrams/DependentOriginationDiagram";
import { EightfoldPathDiagram } from "@/components/diagrams/EightfoldPathDiagram";
import { FourNobleTruthsDiagram } from "@/components/diagrams/FourNobleTruthsDiagram";
import { SixParamitasDiagram } from "@/components/diagrams/SixParamitasDiagram";
import { BoatCrossingIllustration } from "@/components/illustrations/BoatCrossingIllustration";
import { ChariotPartsIllustration } from "@/components/illustrations/ChariotPartsIllustration";
import { ConditionsIllustration } from "@/components/illustrations/ConditionsIllustration";
import { ConvergingPathsIllustration } from "@/components/illustrations/ConvergingPathsIllustration";
import { RiverIllustration } from "@/components/illustrations/RiverIllustration";
import { ScratchedPhoneIllustration } from "@/components/illustrations/ScratchedPhoneIllustration";
import { SeedGrowthIllustration } from "@/components/illustrations/SeedGrowthIllustration";
import { UnreadMessageIllustration } from "@/components/illustrations/UnreadMessageIllustration";

import { ConceptLink } from "./ConceptLink";
import { ConceptSummary } from "./ConceptSummary";
import { ExampleCard } from "./ExampleCard";
import { ImageWithCaption } from "./ImageWithCaption";
import { Misconception } from "./Misconception";
import { QuoteBlock } from "./QuoteBlock";
import { RelatedConcepts, type RelatedConceptsProps } from "./RelatedConcepts";

type MdxComponentContext = {
  /** 현재 문서 frontmatter의 related. <RelatedConcepts />에 자동으로 전달된다. */
  relatedConceptSlugs: string[];
};

/**
 * MDX 문서에서 사용할 수 있는 컴포넌트 목록.
 * MDX는 이름만 알고, 실제 표현은 여기서 연결한다 (MDX = 콘텐츠, React = 표현).
 * 새 콘텐츠·다이어그램 컴포넌트를 만들면 여기에 등록해야 MDX에서 쓸 수 있다.
 */
export function createMdxComponents({ relatedConceptSlugs }: MdxComponentContext): MDXComponents {
  return {
    ConceptSummary,
    ExampleCard,
    Misconception,
    QuoteBlock,
    ImageWithCaption,
    ConceptLink,
    RelatedConcepts: (props: Partial<RelatedConceptsProps>) => (
      <RelatedConcepts conceptSlugs={relatedConceptSlugs} {...props} />
    ),
    FourNobleTruthsDiagram,
    EightfoldPathDiagram,
    SixParamitasDiagram,
    DependentOriginationDiagram,
    SeedGrowthIllustration,
    ConditionsIllustration,
    RiverIllustration,
    ChariotPartsIllustration,
    BoatCrossingIllustration,
    ConvergingPathsIllustration,
    ScratchedPhoneIllustration,
    UnreadMessageIllustration,
  };
}
