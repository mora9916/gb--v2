import { Injectable, signal } from '@angular/core';
import { Product } from '../../models/product';
import products from '../../data/products.json';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Definimos la propiedad products como un array de Product
  // y la inicializamos con el array products importado de products.json
  products: Product[] = products;
  private searchResults = this.products;
  private count = signal<number>(0);
  getCounter(){
    return this.count;
  }
  incremento(){
    this.count.update(n => n + 1);
  }
  decremento(){
    this.count.update(n => n -1);
  }
  reset(){
    this.count.set(0);
  }

  constructor() { }
  getProducts(): Product[] {
    return this.products;
  } 
  // Método que devuelve un producto por su id
  getProduct(posicion: number): Product {
    return this.products[posicion];
  }
  getProductById(id: number): Product | undefined { 
    return this.products.find(product => product.id === id);
  }
  // Método que devuelve un producto por su id
  searchProduct(nameP: string): number {
    let index = this.products.findIndex(p => p.name === nameP);
    return index;
  }
  searchProducts(term:string):Product[]{
    const filteredProducts=this.products.filter(
      (product)=>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.brand.toLowerCase().includes(term.toLowerCase())
    );
    this.searchResults=filteredProducts;
    return this.searchResults;
  }
  getCart(): number[] {
    const cartString = localStorage.getItem('cart');
    if (cartString == null) {
      return [];      
    }
    const cart = JSON.parse(cartString);
    const length = cart.length;
    this.count.update(n => length);

    return cart;
  }
  addToCart(id: number) {
    this.incremento();
    const cart = this.getCart();
    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  removeFromCart(id: number) {
    this.decremento();
    const cart = this.getCart();
    const index = cart.indexOf(id);
    if (index > -1) {
      cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }


}
