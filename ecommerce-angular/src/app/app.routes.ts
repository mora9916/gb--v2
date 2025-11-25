import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'cart', component: CartComponent},
    {path: 'login', component: LoginComponent},
    // {
    //     path: 'login', loadComponent:() => import('../app/pages/login/login.component').then(c=>c.LoginComponent),
    //     title: 'login'
    // },
    
    // Ruta para ver los detalles de un producto
    {path:'product/:id', component:ProductDetailsComponent},
    // Rutas para filtrar productos por categoria
    {path: 'products/:category', component: ProductsListComponent},
    // Rutas para filtrar productos por categoria y marca
    {path: 'products/:category/:brand', component: ProductsListComponent},
    
    
    // Path comodines por en caso de teclaer una ruta incorrecta
    // redirige a la ruta de inicio
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
