import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { InternalNotesComponent } from './internal-notes.component';
import { StatusInfoComponent } from './status-info.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { conceptActions } from '../+state';
import { MatDividerModule } from '@angular/material/divider';
import { selectConcept } from '../+state/concept.selectors';
import { ConnectFormDirective } from '../directives/connect-form.directive';
import {
  conceptLabels,
  ConceptType,
  individualConceptLabels,
  IndividualConceptType,
} from '@systematic/concept-model';

interface ConceptForm {
  name: FormControl<string | null>;
  specification: FormControl<string | null>;
  alternateNames: FormArray<FormControl<string | null>>;
  conceptType: FormControl<ConceptType | null>;
  individualConceptType: FormControl<IndividualConceptType | null>;
}

@Component({
  selector: 'concept-container',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    InternalNotesComponent,
    StatusInfoComponent,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    NgIf,
    MatDividerModule,
    ConnectFormDirective,
  ],
  template: `
    <div
      [formGroup]="formGroup"
      [connectForm]="concept$ | async"
      class="flex flex-col w-full"
    >
      <div class="flex justify-around">
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Specification</mat-label>
          <input matInput formControlName="specification" />
        </mat-form-field>
        <mat-form-field
          formArrayName="alternateNames"
          *ngFor="
            let alternateName of formGroup.value.alternateNames;
            let i = index
          "
        >
          <input matInput [formGroupName]="i" />
          <button mat-fab color="primary" (click)="removeAlternateName(i)">
            <mat-icon>delete</mat-icon>
          </button>
        </mat-form-field>
        <button
          mat-button
          (click)="addAlternateName()"
          style="width: fit-content"
        >
          Add alternate name
        </button>
        <mat-select
          formControlName="conceptType"
          class="border-2 max-w-[20vw] max-h-[6vh]"
        >
          <mat-option></mat-option>
          <mat-option *ngFor="let concept of conceptTypes" [value]="concept">
            {{ conceptLabels[concept] }}
          </mat-option>
        </mat-select>
        <mat-select
          *ngIf="isIndividualConceptSelected()"
          formControlName="individualConceptType"
        >
          <mat-option></mat-option>
          <mat-option
            *ngFor="let concept of individualConceptTypes"
            [value]="concept"
          >
            {{ individualConceptLabels[concept] }}
          </mat-option>
        </mat-select>
      </div>
      <mat-divider style="margin: 8px 0"></mat-divider>
      <internal-notes></internal-notes>
      <mat-divider style="margin: 8px 0"></mat-divider>
      <status-info></status-info>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConceptContainerComponent implements OnInit {
  protected readonly conceptLabels = conceptLabels;
  protected readonly individualConceptLabels = individualConceptLabels;

  formGroup: FormGroup<ConceptForm>;
  conceptTypes = Object.keys(conceptLabels) as ConceptType[];
  individualConceptTypes = Object.keys(
    individualConceptLabels
  ) as IndividualConceptType[];

  concept$ = this.store.select(selectConcept);

  constructor(private fb: FormBuilder, private store: Store) {
    this.formGroup = new FormGroup<ConceptForm>({
      name: fb.control(''),
      alternateNames: fb.array([fb.control('')]),
      conceptType: fb.control(null),
      individualConceptType: fb.control(null),
      specification: fb.control(''),
    });
  }

  ngOnInit() {
    this.store.dispatch(conceptActions.loadConcepts());
  }

  removeAlternateName(i: number) {
    (this.formGroup.get('alternateNames') as FormArray).removeAt(i);
  }

  addAlternateName() {
    (this.formGroup.get('alternateNames') as FormArray).push(
      this.fb.control('')
    );
  }

  isIndividualConceptSelected(): boolean {
    return this.formGroup.value.conceptType === 'INDIVIDUAL_CONCEPT';
  }
}
