import { Component } from '@angular/core';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { map, Observable } from 'rxjs';
import { SearchProductsComponent } from '../../components/products/search-products/search-products.component';
import { ProductosSelectedComponent } from '../../components/products/productos-selected/productos-selected.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, SearchProductsComponent, ProductosSelectedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  indicators:boolean = false;
  autoPlay: boolean = true;

  title: string ='';

  constructor(){
    this.title$.pipe(
      map(data=>{
        return data.toDateString()
      }
      )
    ).subscribe(this.setTitle)
  }

  private setTitle= ()=>{
    const date = new Date();
    this.title = `(${date})`
  }

  title$ = new Observable<Date>((observer)=>{
    setInterval(()=>{
      observer.next(new Date())
    }, 2000)
  })
 

}
