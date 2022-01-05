import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Currency } from '../currency/currency';
import { Dish } from '../dishes/dish';
import { CartService } from './cart.service';
import { CurrencyService } from '../currency/currency.service';
import { map } from 'rxjs';
import { Item } from '../items/item';
import { CounterService } from '../counter/counter.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  items!: Item[];
  currency!: Currency;
  totalPrice!: number;
  subscription: any;
  totalQuantity!: number;
  
  constructor(private currencyService: CurrencyService, private cartService: CartService, private counterService: CounterService) {
    
  }
  
  async ngOnInit() {
    this.currencyService.currentCurrency.subscribe(currency => this.currency = currency);
    this.subscription = (await this.cartService.getItems()).snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() })))
      ).subscribe(items => {
        this.items = <Item[]> items;  
        this.totalPrice = this.calculateTotalPrice(this.items);
      });
      
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    calculateTotalPrice(items: Item[]) {
      let sum = 0;
      items.forEach(item => {
          sum += item.quantity * item.item.price;
      });
      return Math.round(sum * 1000) / 1000;
    }
    

}
