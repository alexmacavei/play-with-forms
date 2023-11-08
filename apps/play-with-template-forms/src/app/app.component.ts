import { Component } from '@angular/core';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ConceptFormComponent } from './components/concept-form.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, ConceptFormComponent],
  selector: 'play-with-forms-root',
  template: `<pwf-concept-form class="flex justify-center"></pwf-concept-form>`,
  styles: [''],
})
export class AppComponent {
  title = 'play-with-template-forms';
}
