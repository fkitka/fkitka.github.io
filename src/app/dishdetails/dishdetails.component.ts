import { Component, OnInit } from '@angular/core';
import { Currency } from '../currency/currency';
import { Dish } from '../dishes/dish';
import { CartService } from '../cart/cart.service';
import { CurrencyService } from '../currency/currency.service';
import { DishService } from '../dishes/dish.service';
import { ReviewService } from '../reviews/review.service';

@Component({
  selector: 'app-dishdetails',
  templateUrl: './dishdetails.component.html',
  styleUrls: ['./dishdetails.component.css']
})
export class DishdetailsComponent implements OnInit {
  dish!: Dish;
  currency!: Currency;
  counter = 0;
  constructor(private dishService: DishService,
     private currencyService: CurrencyService, 
     private reviewService: ReviewService,
     ) { }

  ngOnInit(): void {
    this.dish = this.dishService.getCurrentDish();
    this.currencyService.currentCurrency.subscribe(currency => this.currency = currency)
    this.reviewService.setCurrentDishReviews(this.dish);
    // console.log(this.dish.pictures.split(',')[0])
  }
  setReviewCounter(counter: number){
    this.counter = counter;
  }

}
