import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-images-section',
  imports: [],
  templateUrl: './images-section.component.html',
  styleUrl: './images-section.component.css'
})
export class ImagesSectionComponent {
  @Input() cards: { img: string; title: string }[] = [];
}
