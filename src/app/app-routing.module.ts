import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { CartComponent } from './cart/cart.component';
import { DishdetailsComponent } from './dishdetails/dishdetails.component';
import { DishesComponent } from './dishes/dishes.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './user-auth/login/login.component';
import { RegisterComponent } from './user-auth/register/register.component';
import { AuthGuard } from './user-auth/guard/auth.guard';
import { AdminAuthGuard } from './user-auth/guard/admin-auth.guard';
import { ManagerAuthGuard } from './user-auth/guard/manager-auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "dishes/:page", component: DishesComponent },
  
  { path: "dish/:dish.id", component: DishdetailsComponent,
  canActivate: [AuthGuard]},
  { path: "cart", component: CartComponent,
    canActivate: [AuthGuard] },

  { path: "add", component: AddComponent,
    canActivate: [AuthGuard, ManagerAuthGuard]},
  { path: "adminview", component: NotfoundComponent,
    canActivate: [AuthGuard, AdminAuthGuard]},

  { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
