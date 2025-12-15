import { Component, Input, OnInit } from '@angular/core';

export type ImageBanner = {
  src: string;
  loaded: boolean;
  loading: boolean;
  alt: string;
};

@Component({
  selector: 'app-image-banner',
  standalone: true,
  imports: [],
  templateUrl: './image-banner.component.html',
  styleUrl: './image-banner.component.css'
})
export class ImageBannerComponent implements OnInit {
  @Input() images: ImageBanner[] = [
    { src: 'images/banner-SVB.png', loaded: true, loading: false, alt: '' }
  ];

  ngOnInit(): void {
    this.loadedImage(0);
  }

  loadedImage(index: number) {
    // Lógica para marcar la imagen como cargada
    if (this.images[index]) {
      this.images[index].loaded = true;
      this.images[index].loading = false;
    }
  }
}