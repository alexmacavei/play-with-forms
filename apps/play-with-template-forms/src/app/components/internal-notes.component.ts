import { ChangeDetectionStrategy, Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalNotes, statuses } from '@systematic/concept-model';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { formViewProvider } from '../form-view-provider';
import { getLastNumber } from '../app.config';

@Component({
  selector: 'pwf-internal-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <ng-container>
      <div class="p-2">
        <label>
          <span class="mr-3.5">Status</span>
          <select class="selector" name="status" [ngModel]="formValue().status">
            <option></option>
            <option *ngFor="let status of statuses">{{ status.url }}</option>
          </select>
        </label>
      </div>
      <div class="p-2" ngModelGroup="notes">
        <div *ngFor="let nkv of formValue().notes | keyvalue; trackBy: tracker">
          <label>
            <span class="mr-3.5">Note</span>
            <input [ngModel]="formValue().notes?.[nkv.key] || ''" name="{{ nkv.key }}" />
          </label>
          <button type="button" class="ml-2 btn-pill" (click)="removeNote(nkv.key)">-</button>
        </div>
      </div>
      <button class="btn-primary" (click)="addNote()">Add note</button>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    { provide: ControlContainer, useExisting: NgForm },
    formViewProvider, // very important if we want nested components with ngModelGroup
  ],
})
export class InternalNotesComponent {
  @Input()
  formValue!: WritableSignal<InternalNotes>;

  statuses = statuses;

  addNote() {
    const newNoteKey = getLastNumber(Object.keys(this.formValue().notes || {}));
    this.formValue.set({
      ...this.formValue(),
      notes: {
        ...this.formValue().notes,
        [`note_${newNoteKey}`]: '',
      },
    });
  }

  removeNote(key: string) {
    const updatedNotes = this.formValue().notes;
    delete updatedNotes?.[key];
    this.formValue.set({
      ...this.formValue(),
      notes: updatedNotes,
    });
  }

  tracker = (_: number, item: {key: string}) => item.key;
}
