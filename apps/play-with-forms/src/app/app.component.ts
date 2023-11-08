import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ConceptContainerComponent} from "./concept/concept-container.component";

@Component({
  standalone: true,
  imports: [RouterModule, ConceptContainerComponent],
  selector: 'play-with-forms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'play-with-forms';
}
