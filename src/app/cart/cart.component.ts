import { Component, Input, OnInit } from '@angular/core';
import { Currency } from '../currency/currency';
import { Dish } from '../dishes/dish';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() items!: Dish[]
  @Input() currentCurrency!:  Currency;
  isHidden: boolean
  constructor() {
    this.isHidden = true;
   }

  ngOnInit(): void {
  }
  openCart(){
    this.isHidden = !this.isHidden;
  }
  sum(items: Dish[]): number{
    let sum = 0
    for (const item of items) {
      sum += item.price * this.currentCurrency.converter * item.ordered
    }
    return Math.round(sum * 1000) / 1000;
  }
}
