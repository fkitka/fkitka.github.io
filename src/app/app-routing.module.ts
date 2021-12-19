import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { CartComponent } from './cart/cart.component';
import { DishdetailsComponent } from './dishdetails/dishdetails.component';
import { DishesComponent } from './dishes/dishes.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path: "dishes/:page", component: DishesComponent},
  {path: "add", component: AddComponent},
  {path: "cart", component: CartComponent},
  {path: "", component: HomeComponent},
  {path: "dish/:dish.id", component: DishdetailsComponent},
  {path: "**", component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
