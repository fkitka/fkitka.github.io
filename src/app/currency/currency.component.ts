import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Currency } from './currency'
import { CURRENCIES } from './currencies-list';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  currencies = CURRENCIES;
  currentCurrency: Currency;
  @Output() currentCurrencyChange = new EventEmitter<Currency>();
  constructor() {
     this.currentCurrency = this.currencies[0];
  }

  ngOnInit(): void {
  }
  changeCurrency(){
   this.currentCurrency=this.currencies[this.currentCurrency.id%2];
   this.currentCurrencyChange.emit(this.currentCurrency);
  }
}
