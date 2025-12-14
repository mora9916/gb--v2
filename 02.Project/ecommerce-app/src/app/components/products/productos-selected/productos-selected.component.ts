import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../core/types/Products';
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
export class ProductosSelectedComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  autoPlay: boolean = true;
  showIndicators: boolean = true;
  showControls: boolean = true;
  interval: number = 7000;

  currentIndex = 0;
  visibleCards = 5; // Default for large screens
  private isDestroyed: boolean = false;
  private autoPlayInterval?: number;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.updateVisibleCards();
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    this.stopAutoPlay();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateVisibleCards();
  }

  private updateVisibleCards() {
    const width = window.innerWidth;
    if (width < 768) {
      this.visibleCards = 1;
    } else if (width < 1024) {
      this.visibleCards = 3;
    } else {
      this.visibleCards = 5;
    }
  }

  private loadProducts() {
    this.productsService.getProducts(1, 15).subscribe({
      next: (response) => {
        this.products = response.products;
        if (this.products.length > this.visibleCards && this.autoPlay) {
          this.startAutoPlay();
        }
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  private startAutoPlay() {
    if (this.autoPlay && !this.isDestroyed && this.products.length > this.visibleCards) {
      this.autoPlayInterval = window.setInterval(() => {
        this.nextProduct();
      }, this.interval);
    }
  }

  private stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = undefined;
    }
  }

  nextProduct() {
    if (this.currentIndex < this.products.length - this.visibleCards) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevProduct() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.products.length - this.visibleCards;
    }
  }

  goToProduct(index: number) {
    this.currentIndex = index;
  }

  get visibleProducts(): Product[] {
    return this.products.slice(this.currentIndex, this.currentIndex + this.visibleCards);
  }

  get totalIndicators(): number {
    return Math.max(0, this.products.length - this.visibleCards + 1);
  }

  get indicatorArray(): number[] {
    return Array.from({ length: this.totalIndicators }, (_, i) => i);
  }
}
