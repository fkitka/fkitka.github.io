import { Component, OnInit } from '@angular/core';
import { CURRENCIES } from './currencies-list';
import { CurrencyService } from '../services/currency.service';
import { Currency } from './currency';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  currencies = CURRENCIES;
  currency!: Currency;
  constructor(private currencyService:  CurrencyService) {
  }
  ngOnInit(): void {
    this.currencyService.currentCurrency.subscribe(currency => this.currency = currency);
  }
  changeCurrency(){
    this.currencyService.setCurrency(this.currencies[this.currency.id%2]);
  }
}
