import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dish } from '../dishes/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {
  @Input() currentDish!: Dish;
  @Output() itemRemoved = new EventEmitter<Dish>();
  @Output() counterChange = new EventEmitter<number>();
  
  constructor(private dishService: DishService) { }

  ngOnInit(): void {
  }
  deleteDish(){
    this.dishService.deleteDish(this.currentDish.name);
    this.itemRemoved.emit(this.currentDish);
    this.counterChange.emit(this.currentDish.ordered);
  }
}
