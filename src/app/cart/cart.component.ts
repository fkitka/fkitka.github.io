import { Component, Input, OnInit } from '@angular/core';
import { Currency } from '../currency/currency';
import { Dish } from '../dishes/dish';
import { CartService } from '../services/cart.service';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items!: Dish[];
  currency!: Currency;
  constructor(private currencyService: CurrencyService, private cartService: CartService) {
    
  }
  
  ngOnInit(): void {
    this.currencyService.currentCurrency.subscribe(currency => this.currency = currency);
    this.cartService.currentItems.subscribe(items => this.items = items);
  }

  sum(items: Dish[]): number{
    let sum = 0
    for (const item of items) {
      sum += item.price * this.currency.converter * item.ordered
    }
    return Math.round(sum * 1000) / 1000;
  }
}
