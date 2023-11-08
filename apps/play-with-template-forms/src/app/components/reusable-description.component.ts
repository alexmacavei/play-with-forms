import {
  ChangeDetectionStrategy,
  Component,
  Input,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Description } from '@systematic/concept-model';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { formViewProvider } from '../form-view-provider';

@Component({
  selector: 'pwf-reusable-description',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <ng-container>
      <div class="p-2">
        <label for="publicDescField" class="label-for-input"
          >Public description
        </label>
        <textarea
          id="publicDescField"
          name="publicDescription"
          [ngModel]="formValue().publicDescription || ''"
        ></textarea>
      </div>
      <div class="p-2">
        <label for="privateDescField" class="label-for-input"
          >Private description
        </label>
        <textarea
          id="privateDescField"
          name="nonpublicDescription"
          [ngModel]="formValue().nonpublicDescription || ''"
        ></textarea>
      </div>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    { provide: ControlContainer, useExisting: NgForm },
    formViewProvider, // very important if we want nested components with ngModelGroup
  ],
})
export class ReusableDescriptionComponent {
  @Input()
  formValue!: WritableSignal<Description>;
}
