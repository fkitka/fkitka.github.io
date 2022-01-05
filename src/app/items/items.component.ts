import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dish } from '../dishes/dish';
import { CartService } from '../cart/cart.service';
import { CounterService } from '../counter/counter.service';
import { DishService } from '../dishes/dish.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() currentDish!: Dish;
  counter!: number;
  constructor(private counterService: CounterService,
    private dishService: DishService,
    private cartService: CartService) {
  }

  ngOnInit(): void {
    this.counterService.currentCounter.subscribe(counter => this.counter = counter);
  }
  addItemToCart(dish: Dish) {
    if (dish.amount - dish.ordered > 0) {
      this.cartService.addToCart(dish);
      dish.ordered += 1;
      this.dishService.updateDish(dish.key, dish)
    }
  }
  removeItemFromCart(dish: Dish) {
    if (dish.ordered > 0) {
      this.cartService.removeFromCart(dish);
      this.cartService.isDishInCart(dish).then(isAnyDishLeft =>{
        if (isAnyDishLeft){
          dish.ordered -= 1;
          this.dishService.updateDish(dish.key, dish)
        }
      });
        
      
    }
  }
}

