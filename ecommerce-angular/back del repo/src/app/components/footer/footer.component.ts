import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
