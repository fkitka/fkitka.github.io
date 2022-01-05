import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { CounterService } from 'src/app/counter/counter.service';
import { DishService } from 'src/app/dishes/dish.service';
import { Dish } from 'c:/Users/Admin/Desktop/zajecia/wdai/lab4/restaurant/src/app/dishes/dish';

@Component({
  selector: 'app-dish-manager',
  templateUrl: './dish-manager.component.html',
  styleUrls: ['./dish-manager.component.css']
})
export class DishManagerComponent implements OnInit {
  counter = 0;
  subscription: any;
  dishes: Dish[] = [];
  isHidden = true;
  currentDish!: Dish;
  constructor(private dishService: DishService, private cartService: CartService, private counterService: CounterService) { }

  ngOnInit(): void {
    this.counterService.currentCounter.subscribe(counter => this.counter = counter);
    this.subscription = this.dishService.getDishesList().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(dishes =>{
      this.dishes = (<Dish[]>dishes);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onItemRemoved(dish: Dish){
    this.counterService.changeCounter(this.counter - dish.ordered);
  }
  editDish(dish: Dish){
    this.setCurrentDish(dish);
    this.isHidden = !this.isHidden;
  }
  setCurrentDish(dish: Dish){
    this.currentDish = dish;
  }
}
