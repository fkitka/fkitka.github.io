import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dish } from '../dishes/dish';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() currentDish!: Dish;
  counter!: number;
  @Input() menuItems!: Dish[];
  @Output() menuItemsChange = new EventEmitter<Dish[]>();
  constructor(private counterService: CounterService) {
   }

  ngOnInit(): void {
    this.counterService.currentCounter.subscribe(counter => this.counter = counter);
  }
  addItemToCart(dish: Dish){
    if (dish.amount - dish.ordered > 0){
      dish.ordered += 1;
      this.counter += 1;
      this.counterService.changeCounter(this.counter);
      if (dish.ordered == 1){
        this.menuItems.push(dish);
      }
    }
  }
  removeItemFromCart(dish: Dish){
    if (dish.ordered > 0){    
      dish.ordered -= 1;
      this.counter -= 1;
      if (dish.ordered == 0){
        let index = this.menuItems.indexOf(dish);
        this.menuItems.splice(index, 1);
      }
      this.counterService.changeCounter(this.counter);
    }
  }
}
