import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { conceptActions, FullState } from './index';
import { ConceptService } from '../services/concept.service';

export const loadConcepts = createEffect(
  (actions$ = inject(Actions), conceptService = inject(ConceptService)) => {
    return actions$.pipe(
      ofType(conceptActions.loadConcepts),
      exhaustMap(() =>
        conceptService
          .getConceptEntity()
          .pipe(map((entity) => conceptActions.setState(entity as FullState)))
      )
    );
  },
  { functional: true }
);
