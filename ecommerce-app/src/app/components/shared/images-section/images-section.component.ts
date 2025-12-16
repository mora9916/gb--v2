import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-images-section',
  imports: [NgClass],
  templateUrl: './images-section.component.html',
  styleUrl: './images-section.component.css'
})
export class ImagesSectionComponent {
  @Input() cards: any[] = [];
  @Input() type: 'category' | 'service' = 'category'; // 'category' será el default
}
