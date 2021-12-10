import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dish } from '../dishes/dish';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() currentDish!: Dish;
  @Input() counter!: number;
  @Output() counterChange = new EventEmitter<number>();
  @Input() menuItems!: Dish[];
  @Output() menuItemsChange = new EventEmitter<Dish[]>();
  constructor() {
   }

  ngOnInit(): void {
  }
  addItemToCart(dish: Dish){
    if (dish.amount - dish.ordered > 0){
      dish.ordered += 1;
      this.counter += 1;
      this.counterChange.emit(this.counter);
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
      this.counterChange.emit(this.counter);
    }
  }
}
