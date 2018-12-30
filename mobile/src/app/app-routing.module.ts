import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MenuComponent} from './menu/menu.component';
import {CartComponent} from './cart/cart.component';
import {FavouritesComponent} from './favourites/favourites.component';
import {FinishComponent} from './finish/finish.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'cart', component: CartComponent},
  {path: 'favourites', component: FavouritesComponent},
  {path: 'finish', component: FinishComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
