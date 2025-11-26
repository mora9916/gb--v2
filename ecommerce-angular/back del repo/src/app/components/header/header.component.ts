import { Component, EventEmitter, Output, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() productOutPut: EventEmitter<Product[]> = new EventEmitter<Product[]>;

  misProductos: Product[] = [];
  findProduct:Product[]=[];
  counter!: Signal<number>;

  constructor( public productsService:ProductsService) {
    this.counter = this.productsService.getCounter();
  }
  
  ngOnInit(){
    this.misProductos=this.productsService.getProducts();
    this.productsService.getCart();
  }

  onSearch(toSearch:string){
    if( toSearch == '' ){
      this.findProduct=this.productsService.getProducts();
      this.productOutPut.emit(this.findProduct);
    }else{
      this.findProduct= this.productsService.searchProducts(toSearch);
      this.productOutPut.emit(this.findProduct);
    }
  }

}
