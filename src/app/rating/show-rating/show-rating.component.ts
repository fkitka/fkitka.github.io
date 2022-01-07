import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish } from 'src/app/dishes/dish';
import { RatingService } from '../rating.service';

@Component({
  selector: 'app-show-rating',
  templateUrl: './show-rating.component.html',
  styleUrls: ['./show-rating.component.css']
})
export class ShowRatingComponent implements OnInit {
  @Input() currentDish!: Dish;
  stars = [1, 2, 3, 4, 5];
  ratingNum = 0;
  constructor(private ratingService: RatingService) { }

  ngOnInit(): void {
    this.ratingService.getCurrentDishRating().subscribe(rating => this.ratingNum = rating);
  }
}
