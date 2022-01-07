import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ReviewService } from "../reviews/review.service";

@Injectable()
export class RatingService{
    
    constructor(private reviewService: ReviewService){
    }
    setRating(ratingNum: number) {
        this.reviewService.setReviewsRating(ratingNum);
    }
    getCurrentDishRating(){
        return this.reviewService.currentDishRating;
    }
}