import {
  ConceptState,
  conceptStateFeatureKey,
  FullState,
  InternalNotesState,
  StatusInfoState,
} from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const conceptFeatureSelector = createFeatureSelector<FullState>(
  conceptStateFeatureKey
);

export const selectConcept = createSelector(conceptFeatureSelector, (state) => {
  const {
    individualConceptType,
    name,
    conceptType,
    alternateNames,
    specification,
  } = state;
  return {
    name,
    conceptType,
    individualConceptType,
    alternateNames,
    specification,
  } as ConceptState;
});
export const selectInternalNotes = createSelector(
  conceptFeatureSelector,
  (state) => {
    const { internal, external } = state;
    return { internal, external } as InternalNotesState;
  }
);
export const selectStatusInfo = createSelector(
  conceptFeatureSelector,
  (state) => {
    const { status, notes } = state;
    return { status, notes } as StatusInfoState;
  }
);
