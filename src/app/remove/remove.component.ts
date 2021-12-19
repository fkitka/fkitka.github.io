import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dish } from '../dishes/dish';
import { DISHES } from '../dishes/dishes-list';
import { CartService } from '../services/cart.service';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {
  @Input() currentDish!: Dish;
  @Output() itemRemoved = new EventEmitter<Dish>();
  @Output() counterChange = new EventEmitter<number>();
  constructor(private counterService: CounterService) { }

  ngOnInit(): void {
  }
  deleteDish(){
    let i = DISHES.indexOf(this.currentDish);
    DISHES.splice(i, 1);
    this.itemRemoved.emit(this.currentDish);
    this.counterChange.emit(this.currentDish.ordered);
  }
}
