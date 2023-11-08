import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Concept, conceptLabels } from '@systematic/concept-model';
import { FormDirective } from '../directives/form.directive';
import { InternalNotesComponent } from './internal-notes.component';
import { ReusableDescriptionComponent } from './reusable-description.component';
import { getLastNumber } from '../app.config';

@Component({
  selector: 'pwf-concept-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FormDirective, InternalNotesComponent, ReusableDescriptionComponent],
  template: `
    <div class="flex-col flex card">
      <div class="flex justify-center">
        <h1 class="h-4 m-5 text-xl font-bold underline">Concept Form</h1>
      </div>
      <form (formValueChange)="setFormValue($event)">
        <div class="grid gap-6 mb-6 md:grid-cols-1">
          <div class="p-2">
            <label for="nameField" class="label-for-input">Name</label>
            <input id="nameField" [ngModel]="formValue().name" name="name" />
          </div>
          <div class="p-2">
            <label for="specificationField" class="label-for-input">Specification</label>
            <input id="specificationField" [ngModel]="formValue().specification" name="specification" />
          </div>
          <div class="p-2" ngModelGroup="alternativeNames">
            <div *ngFor="let an of formValue().alternativeNames | keyvalue; trackBy: tracker">
              <label for="alternateNameField" class="label-for-input">Alternate name</label>
              <input
                id="alternateNameField"
                [ngModel]="formValue().alternativeNames?.[an.key] || ''"
                name="{{ an.key }}"
              />
              <button class="ml-2 btn-pill" (click)="removeAlternateName(an.key)">-</button>
            </div>
          </div>
          <button class="btn-primary" (click)="addAlternateName()">Add Alternate Name</button>
          <div class="p-2">
            <label>Concept type</label>
            <select class="ml-2 selector" name="conceptType" [ngModel]="formValue().conceptType">
              <option></option>
              <option *ngFor="let conceptType of conceptTypes">
                {{ conceptType }}
              </option>
            </select>
          </div>
          <pwf-reusable-description [formValue]="formValue"></pwf-reusable-description>
          <pwf-internal-notes [formValue]="formValue"></pwf-internal-notes>
        </div>
      </form>
      <pre>{{ formValue() | json }}</pre>
      <div class="flex justify-center">
        <button class="btn-primary" type="submit">Submit</button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConceptFormComponent {
  conceptTypes = Object.values(conceptLabels);

  formValue = signal<Concept>({});

  setFormValue($event: Concept) {
    this.formValue.set($event);
  }

  onSubmit() {
    console.log(this.formValue());
  }

  addAlternateName() {
    const newAltNameKey = getLastNumber(Object.keys(this.formValue().alternativeNames || {}));
    this.formValue.set({
      ...this.formValue(),
      alternativeNames: {
        ...this.formValue().alternativeNames,
        [`alternativeName_${newAltNameKey}`]: '',
      },
    });
  }

  removeAlternateName(key: string) {
    const alternativeNames = this.formValue().alternativeNames || {};
    const filteredKeys = Object.keys(alternativeNames || {}).filter((k) => k !== key);
    const filteredAlternativeNames = filteredKeys
      .map((k) => ({ [k]: alternativeNames[k] }))
      .reduce((p, c) => ({ ...p, ...c }), {});
    this.formValue.update((old) => ({
      ...old,
      alternativeNames: { ...filteredAlternativeNames },
    }));
  }

  protected tracker = (_: number, item: { key: string }) => item.key;
}
