import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
//import { ProductsListComponent } from '../products-list/products-list.component';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product: Product | undefined;
  
  constructor( private productsService: ProductsService, private route: ActivatedRoute ) { } // Inyectar el servicio de productos

  ngOnInit():void{
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.product= this.productsService.getProductById(+productId);
    }

  }
  addToCart(id:number){
    this.productsService.addToCart(id);
  }
}
