import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishesComponent } from './dishes/dishes.component';
import { CurrencyComponent } from './currency/currency.component';
import { ItemsComponent } from './items/items.component';
import { RateComponent } from './rate/rate.component';
import { FilterComponent } from './filter/filter.component';
import { CartComponent } from './cart/cart.component';
import { RemoveComponent } from './remove/remove.component';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StarComponent } from './star/star.component';
import { FilterDishesPipe } from './pipes/filterdishes.pipe';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MenuComponent } from './menu/menu.component';
import { CartService } from './services/cart.service';
import { CurrencyService } from './services/currency.service';
import { DishService } from './services/dish.service';
import { CounterService } from './services/counter.service';
import { DishdetailsComponent } from './dishdetails/dishdetails.component';
import { CounterComponent } from './counter/counter.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationService } from './services/pagination.service';
@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    CurrencyComponent,
    ItemsComponent,
    RateComponent,
    FilterComponent,
    CartComponent,
    RemoveComponent,
    AddComponent,
    StarComponent,
    FilterDishesPipe,
    HomeComponent,
    NotfoundComponent,
    MenuComponent,
    DishdetailsComponent,
    CounterComponent,
    ReviewsComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CartService,
    CurrencyService,
    DishService,
    CounterService,
    PaginationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
