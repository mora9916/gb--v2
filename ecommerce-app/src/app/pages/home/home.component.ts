import { Component } from '@angular/core';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { map, Observable } from 'rxjs';
import { SearchProductsComponent } from '../../components/products/search-products/search-products.component';
import { ProductosSelectedComponent } from '../../components/products/productos-selected/productos-selected.component';
import { RouterLink } from "@angular/router";
import { ImageBannerComponent } from '../../components/shared/image-banner/image-banner.component';
import { ImagesSectionComponent } from '../../components/shared/images-section/images-section.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, SearchProductsComponent, ProductosSelectedComponent, ImagesSectionComponent, ImageBannerComponent, FooterComponent,RouterLink],
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
 
  misCategorias = [
    { img: 'images/categories/playing-cues.png', title: 'Tacos de billar' },
    { img: 'images/categories/cue-cases.png', title: 'Estuches' },
    { img: 'images/categories/gloves.png', title: 'Guantes' },
    { img: 'images/categories/accesories.png', title: 'Bolas y Ruedos completos' },
  ];

  misServicios = [
    { img: 'icons/apoyo.png', title: 'Atención 24/7' },
    { img: 'icons/caja.png', title: 'Envío Express' },
    { img: 'icons/calidad.png', title: 'Calidad Garantizada' },
  ]

}
