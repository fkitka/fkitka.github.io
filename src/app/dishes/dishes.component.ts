import { Component, OnInit } from '@angular/core';
import { DISHES } from './dishes-list';
import { Dish } from './dish';
import { Currency } from '../currency/currency';
import { CurrencyService } from '../services/currency.service';
import { CartService } from '../services/cart.service';
import { DishService } from '../services/dish.service';
import { CounterService } from '../services/counter.service';
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  counter!: number;
  menuItems: Dish[] = [];
  dishes = DISHES;
  currentCurrency!: Currency;
  maxPriceDish: Dish;
  minPriceDish: Dish;
  currency!: Currency
  elementsOnPage = 6;
  pageNum = 2;

  selectedCuisine: string = "";
  selectedType: string = "";
  selectedTime: string = "";
  selectedRating: number = 0;

  constructor(private currencyService: CurrencyService, 
    private cartService: CartService,
     private dishService: DishService,
     private counterService: CounterService,
     private paginationService: PaginationService) { 
    this.minPriceDish = this.getMinPriceDish();
    this.maxPriceDish = this.getMaxPriceDish();
  }

  ngOnInit(): void {
    this.currencyService.currentCurrency.subscribe(currency => this.currency = currency)
    this.cartService.currentItems.subscribe(items => this.menuItems = items);
    this.counterService.currentCounter.subscribe(counter => this.counter = counter);
    this.paginationService.currentPage.subscribe(page => this.pageNum = page)
    this.paginationService.elementsCount.subscribe(count => this.elementsOnPage = count)
  }


  getMinPriceDish(): Dish{
    return this.dishes.slice(0).sort((a, b)=> (a.price-b.price))[0];
  }
  getMaxPriceDish(): Dish{
    return this.dishes.slice(0).sort((a, b)=>(a.price-b.price))[this.dishes.length-1];
  }

  onItemRemoved(dish: Dish){
    let i = this.menuItems.indexOf(dish);
    this.menuItems.splice(i, 1);
    this.minPriceDish = this.getMinPriceDish();
    this.maxPriceDish = this.getMaxPriceDish();
    this.cartService.changeItems(this.menuItems);
    this.counterService.changeCounter(this.counter - dish.ordered);
  }

  setCurrentDish(dish: Dish){
    this.dishService.setCurrentDish(dish);
  }
  changeType(type: any) {
    this.selectedType = type;
    this.selectedCuisine = "";
    this.selectedTime = "";
    this.selectedRating = 0;
  }
  changeCuisine(cuisine: any) {
    this.selectedCuisine = cuisine;
    this.selectedType = "";
    this.selectedTime = "";
    this.selectedRating = 0;
  }
  changeTime(time: any){
    this.selectedTime = time;
    this.selectedType = "";
    this.selectedCuisine = "";
    this.selectedRating = 0;
  }
  changeRating(rate: any){
    this.selectedRating = rate;
    this.selectedType = "";
    this.selectedCuisine = "";
    this.selectedTime = "";
  }
  changeFiltering(){
    this.selectedType = "";
    this.selectedCuisine = "";
    this.selectedTime = "";
    this.selectedRating = 0;
  }
}
