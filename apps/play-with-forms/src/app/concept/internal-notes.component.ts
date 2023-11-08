import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { selectInternalNotes } from '../+state/concept.selectors';
import { ConnectFormDirective } from '../directives/connect-form.directive';

export interface InternalNotesForm {
  external: FormControl<string | null>;
  internal: FormControl<string | null>;
}

@Component({
  selector: 'internal-notes',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    ConnectFormDirective,
  ],
  template: `
    <div
      class="flex place-content-around"
      [formGroup]="formGroup"
      [connectForm]="internalNotes$ | async"
    >
      <mat-form-field>
        <mat-label>External description</mat-label>
        <textarea
          formControlName="external"
          matInput
          cdkTextareaAutosize
          #autosize="cdkTextareaAutosize"
          placeholder="External description..."
          cdkAutosizeMinRows="5"
        >
        </textarea>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Internal description</mat-label>
        <textarea
          formControlName="internal"
          matInput
          cdkTextareaAutosize
          #autosize="cdkTextareaAutosize"
          placeholder="Internal description..."
          cdkAutosizeMinRows="5"
        >
        </textarea>
      </mat-form-field>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternalNotesComponent {
  formGroup: FormGroup<InternalNotesForm>;

  internalNotes$ = this.store.select(selectInternalNotes);

  constructor(private fb: FormBuilder, private store: Store) {
    this.formGroup = new FormGroup<InternalNotesForm>({
      internal: fb.control(null),
      external: fb.control(null),
    });
  }
}
