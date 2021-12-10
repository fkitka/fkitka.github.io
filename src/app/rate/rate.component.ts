import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dish } from '../dishes/dish';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  @Input() currentDish!: Dish;
  @Input() rating!: number;
  @Output() ratingChange = new EventEmitter<number>();
  stars = [1, 2, 3, 4, 5];
  ratingNum = 0;
  constructor() { }

  ngOnInit(): void {
  }

  onStarClicked(starID: number){
    this.ratingNum = starID;
    this.ratingChange.emit(this.ratingNum);
  }
}
