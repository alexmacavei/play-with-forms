import {
  createActionGroup,
  createReducer,
  emptyProps,
  on,
  props,
} from '@ngrx/store';
import {
  ConceptType,
  IndividualConceptType,
} from '../concept/concept-container.component';
import { Status } from '../concept/status-info.component';

export const conceptStateFeatureKey = 'conceptState';

export interface ConceptState {
  name: string | null;
  specification: string | null;
  alternateNames: string[] | null;
  conceptType: ConceptType | null;
  individualConceptType: IndividualConceptType | null;
}

export interface InternalNotesState {
  external: string;
  internal: string;
}

export interface StatusInfoState {
  status: Status | null;
  notes: string[];
}

export type FullState = ConceptState & StatusInfoState & InternalNotesState;

const initialState: FullState = {
  name: null,
  specification: null,
  alternateNames: [],
  conceptType: null,
  individualConceptType: null,
  external: '',
  internal: '',
  status: null,
  notes: [],
};

export const conceptActions = createActionGroup({
  source: 'Concept Container',
  events: {
    'Set State': props<FullState>(),
    'Load Concepts': emptyProps(),
  },
});

export const conceptReducer = createReducer(
  initialState,
  on(conceptActions.setState, (state, action) => ({ ...action }))
);
