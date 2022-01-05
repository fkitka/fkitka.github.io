import { Injectable } from "@angular/core";
import { Currency } from "./currency";
import { CURRENCIES } from "./currencies-list";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class CurrencyService {
    private currencySource = new BehaviorSubject(CURRENCIES[0]);
    currentCurrency = this.currencySource.asObservable();
    constructor() { 
    }

    setCurrency(currency: Currency){
        this.currencySource.next(currency);
    }

}
