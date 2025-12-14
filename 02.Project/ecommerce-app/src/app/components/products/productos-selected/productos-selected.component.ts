import { Component, ViewChild, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsCardComponent } from '../products-card/products-card.component';
import { ProductsService } from '../../../core/services/products/products.service';

@Component({
  selector: 'app-productos-selected',
  standalone: true,
  imports: [CommonModule, ProductsCardComponent],
  templateUrl: './productos-selected.component.html',
  styleUrl: './productos-selected.component.css'
})
export class ProductosSelectedComponent implements OnInit {
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;
  @ViewChild('carouselInner') carouselInner!: ElementRef;
  
  currentIndex: number = 0; // Initialize
  visibleCards: number = 3; // Example default value, adjust as needed
  showControls: boolean = true; // Initialize
  showIndicators: boolean = true; // Initialize
  products: any[] = []; // Initialize if not already
  public originalProducts: any[] = []; // Initialize as empty array
  private autoPlayInterval: any;
  private autoPlayDelay = 5000;
  isUserInteracting = false;
  disableTransition: boolean = false; // Initialize
  indicatorArray: number[] = []; // Initialize

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    // Initialize properties here if needed, e.g., this.originalProducts = ...;
    this.updateVisibleCards();
    this.loadProducts();
    // Update indicatorArray based on originalProducts.length / visibleCards
    this.updateIndicators();
  }

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (data: any) => {
        this.originalProducts = data.products;
        this.setupInfiniteCarousel();
        this.startAutoPlay();
      },
      error: (error: any) => {
        console.error('Error cargando productos:', error);
      }
    });
  }

  setupInfiniteCarousel() {
    // Duplicar los productos para crear el efecto infinito
    if (this.originalProducts) {
      this.products = [...this.originalProducts, ...this.originalProducts];
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      if (!this.isUserInteracting) {
        this.currentIndex++;

        // Cuando llegamos al final, resetear sin transición visible
        if (this.originalProducts && this.currentIndex >= this.originalProducts.length) {
          setTimeout(() => {
            this.disableTransition = true;
            this.currentIndex = 0;
            
            // Re-habilitar transición después del salto instantáneo
            setTimeout(() => {
              this.disableTransition = false;
            }, 50);
          }, 300);
        }
      }
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  onScroll(event: WheelEvent) {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      event.preventDefault();
    }
    
    this.isUserInteracting = true;
    this.stopAutoPlay();
  }

  onMouseEnter() {
    this.isUserInteracting = true;
    this.stopAutoPlay();
  }

  onMouseLeave() {
    this.isUserInteracting = false;
    this.startAutoPlay();
  }

  prevProduct() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextProduct() {
    this.currentIndex++;

    if (this.originalProducts && this.currentIndex >= this.originalProducts.length) {
      setTimeout(() => {
        this.disableTransition = true;
        this.currentIndex = 0;
        
        setTimeout(() => {
          this.disableTransition = false;
        }, 50);
      }, 300);
    }
  }

  goToProduct(index: number) {
    this.isUserInteracting = true;
    this.currentIndex = index;
    this.startAutoPlay();
  }

  private updateIndicators() {
    this.indicatorArray = Array.from({ length: Math.ceil(this.originalProducts.length / this.visibleCards) }, (_, i) => i);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateVisibleCards();
  }

  updateVisibleCards() {
    const width = window.innerWidth;
    if (width < 640) {
      this.visibleCards = 1;
    } else if (width < 1024) {
      this.visibleCards = 3;
    } else {
      this.visibleCards = 5;
    }
  }
}
