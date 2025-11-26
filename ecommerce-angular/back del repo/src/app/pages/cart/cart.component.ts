import { Component, LOCALE_ID } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products/products.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  myCartList: Product[] = [];
  cart: number[] = [];
  datosCart: {product: Product, quantity: number} [] = [];
  total: number = 0;

  constructor(private productsService:ProductsService) {}

  ngOnInit(){
    this.loadInitialProducts();
    this.loadCart();
    this.calculateCartDetails();
    //this.datosCart = this.myCartList.filter(product => this.cart.includes(product.id));
  }
  loadCart(){
    this.cart = this.productsService.getCart();
  }
  loadInitialProducts(){
    this.myCartList = this.productsService.getProducts();
    console.log(this.myCartList);
  }

  // Calcular cuantas veces aparece el id en el carrito
  calculateCartDetails(){
    const productCount = this.cart.reduce((acc: {[key: number]: number}, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    this.datosCart = this.myCartList.filter(product => this.cart.includes(product.id)).map(product => ({
      product: product,
      quantity: productCount[product.id] || 0
  }));

  this.total = this.datosCart.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  }

  addToCart(productId: number){
    const product = this.myCartList.find(p => p.id === productId);

    if (product){
      const currenQuantity = this. cart.filter(id => id === productId).length;

      if (currenQuantity < product.stock){
        this.productsService.addToCart(productId);
        this.loadCart();
        this.calculateCartDetails();
      }else{
        alert('Stockout');
      }
    }
  }

  removeFromCart(productId: number){
    this.productsService. removeFromCart(productId);
    this.loadCart();
    this.calculateCartDetails();
  }

}
