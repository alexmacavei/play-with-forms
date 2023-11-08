import { Description } from './description.model';
import { InternalNotes } from './internal-notes.model';
import { ValueUrl } from './value-url.model';

export type ConceptType = 'INDIVIDUAL_CONCEPT' | 'CONCEPT';
export const conceptLabels: { [Property in ConceptType]: string } = {
  INDIVIDUAL_CONCEPT: 'Individual concept',
  CONCEPT: 'Concept',
};
export type IndividualConceptType =
  | 'SCIENTIFIC_BRANCH'
  | 'GENERAL'
  | 'PHILOSOPHICAL_CONCEPT';
export const individualConceptLabels: {
  [Property in IndividualConceptType]: string;
} = {
  GENERAL: 'General',
  PHILOSOPHICAL_CONCEPT: 'Philosophical concept',
  SCIENTIFIC_BRANCH: 'Scientific branch',
};

export type Concept = Partial<
  Description &
    InternalNotes & {
      name: string;
      specification: string;
      alternativeNames: { [key: string]: string };
      conceptType: ConceptType;
      individualConceptType: ValueUrl | undefined;
    }
>;
