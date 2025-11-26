import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../models/product';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  imports: [CurrencyPipe],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  @Output() productSelected = new EventEmitter<Product>();

  misProductos: Product[] = [];
  enCarrito: number[] = [];
  productosFiltrados: Product[] = [];
  constructor( public productsService: ProductsService, public route:ActivatedRoute, private router:Router ) {}

  ngOnInit(){
    this.misProductos=this.productsService.getProducts();
    this.enCarrito = this.productsService.getCart();

    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      const brand = params.get('brand');
      this.filtrarProductos(category, brand);
    });
  }
  loadProducts() {
    this.misProductos = this.productsService.getProducts();
  }
  filtrarProductos(category: string | null, brand: string | null) {
    this.productosFiltrados = this.misProductos.filter(p => {
      let matchesCategory = !category || p.category === category;
      let matchesBrand = !brand || p.brand === brand;
      return matchesCategory && matchesBrand;
    });
  }
  // Agregar al carrito
  addToCart(id: number) {
    this.productsService.addToCart(id);
    this.updateCartItems();
  }
  // Checar si el proucto está en el carrito
  checkCart(id:number){
    return this.enCarrito.includes(id);
  }
  // Eliminar del carrito
  removeFromCart(id: number) {
    this.productsService.removeFromCart(id);
    this.updateCartItems();
  }
  updateCartItems(){
    this.enCarrito = this.productsService.getCart();
  }
  swProductDetails(productId: number):void{
    this.router.navigate(['/product', productId]);
  }
  viewCart(){
    this.router.navigate(['/cart']);
  }
  searchEvent(eventProduct:Product[]){
    this.misProductos = eventProduct;
  }
}
