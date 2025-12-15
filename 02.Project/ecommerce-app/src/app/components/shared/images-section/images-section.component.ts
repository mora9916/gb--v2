import { Component } from '@angular/core';

@Component({
  selector: 'app-images-section',
  imports: [],
  templateUrl: './images-section.component.html',
  styleUrl: './images-section.component.css'
})
export class ImagesSectionComponent {
  cards = [
    { img: 'images/categories/playing-cues.png', title: 'Cues' },
    { img: 'images/categories/cue-cases.png', title: 'Cue Cases' },
    { img: 'images/categories/gloves.png', title: 'Gloves' },
    { img: 'images/categories/accesories.png', title: 'Accesories' },
  ];
}
