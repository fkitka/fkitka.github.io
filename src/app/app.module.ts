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
import { CallbackPipe } from './callback.pipe';

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
    CallbackPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
