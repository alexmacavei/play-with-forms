import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { selectStatusInfo } from '../+state/concept.selectors';
import { ConnectFormDirective } from '../directives/connect-form.directive';

export type Status = 'DRAFT' | 'ACTIVE';

interface StatusInfoForm {
  status: FormControl<Status | null>;
  notes: FormArray<FormControl<string | null>>;
}

@Component({
  selector: 'status-info',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NgForOf,
    MatIconModule,
    ConnectFormDirective,
  ],
  template: `
    <div
      class="flex place-content-around"
      [formGroup]="formGroup"
      [connectForm]="statusInfo$ | async"
    >
      <mat-form-field>
        <mat-label>Status</mat-label>
        <mat-select formControlName="status">
          <mat-option></mat-option>
          <mat-option [value]="'DRAFT'">Draft</mat-option>
          <mat-option [value]="'ACTIVE'">Active</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field
        formArrayName="notes"
        *ngFor="let note of formGroup.value.notes; let i = index"
      >
        <input matInput [formControlName]="i" />
        <button mat-flat-button (click)="removeNote(i)">
          <mat-icon>delete</mat-icon>
        </button>
      </mat-form-field>
      <button mat-button (click)="addNote()">Add note</button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusInfoComponent {
  formGroup: FormGroup<StatusInfoForm>;

  statusInfo$ = this.store.select(selectStatusInfo);

  constructor(private fb: FormBuilder, private store: Store) {
    this.formGroup = new FormGroup<StatusInfoForm>({
      status: fb.control(null),
      notes: fb.nonNullable.array([fb.control('')]),
    });
  }

  addNote() {
    (this.formGroup.get('notes') as FormArray).push(this.fb.control(null));
  }

  removeNote(i: number) {
    (this.formGroup.get('notes') as FormArray).removeAt(i);
  }
}
