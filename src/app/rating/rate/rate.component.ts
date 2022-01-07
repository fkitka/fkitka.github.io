import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dish } from '../../dishes/dish';
import { RatingService } from '../rating.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  stars = [1, 2, 3, 4, 5];
  ratingNum = 0;
  constructor(private ratingService: RatingService) { }

  ngOnInit(): void {
  }

  onStarClicked(starID: number){
    this.ratingNum = starID;
    this.ratingService.setRating(this.ratingNum);
  }
}
