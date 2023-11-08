import { Injectable } from '@angular/core';
import { concatMap, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConceptService {
  response = {
    name: 'Geography',
    specification: 'Nature',
    external: 'Study of natural world',
    internal: 'Stuff',
    notes: ['Note 1', 'Other note'],
    alternateNames: ['Name', 'Other name'],
    status: 'DRAFT',
    conceptType: 'INDIVIDUAL_CONCEPT',
    individualConceptType: 'GENERAL',
  };

  getConceptEntity() {
    return of(this.response).pipe(
      concatMap((item) => of(item).pipe(delay(1000)))
    );
  }
}
