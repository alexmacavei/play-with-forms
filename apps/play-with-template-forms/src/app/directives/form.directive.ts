import { Directive, inject, Output } from '@angular/core';
import { debounceTime, tap } from 'rxjs';
import { NgForm } from '@angular/forms';

@Directive({
  selector: 'form',
  standalone: true,
})
export class FormDirective {
  private readonly ngForm = inject(NgForm, { self: true });
  @Output() formValueChange = this.ngForm.form.valueChanges.pipe(
    debounceTime(0),
    tap((vc) => console.log('value changed! ', vc))
  );
}
