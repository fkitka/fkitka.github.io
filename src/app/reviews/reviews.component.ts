import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart/cart.service';
import { Dish } from '../dishes/dish';
import { DishService } from '../dishes/dish.service';
import { RatingService } from '../rating/rating.service';
import { Review } from './review';
import { ReviewService } from './review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  @Output() counterChange = new EventEmitter<number>();
  addReviewForm = new FormGroup({
    rating: new FormControl(0, Validators.required),
    name: new FormControl("", [Validators.required, this.notOnlyWhitespaceValidator]),
    title: new FormControl("", [Validators.required, this.notOnlyWhitespaceValidator]),
    content: new FormControl("", [Validators.required, Validators.minLength(50), Validators.maxLength(500), this.notOnlyWhitespaceValidator]),
    date: new FormControl()
  });
  dish!: Dish;
  subscription: any;
  constructor(private reviewService: ReviewService, private dishService: DishService, private cartService: CartService) { }

  ngOnInit(): void {
    this.dish = this.dishService.dish;
    this.reviewService.setCurrentDishReviews(this.dish);
    this.subscription = this.reviewService.getReviews()
      .valueChanges()
      .subscribe(reviews => {
        this.reviews = <Review[]> reviews
        this.counterChange.emit(this.reviews.length);
      });
  }
  onSubmit() {
    this.cartService.isDishInCart(this.dish).then(exists =>{
      if (exists){
        this.addReviewForm.patchValue({rating: this.reviewService.getRating()});
        this.reviewService.addReview(this.addReviewForm.value, this.dish, this.reviews.length + 1);
        this.addReviewForm.reset();
      }
      else{
        alert("Nie można dodać opinii o daniu, którego nie zarezerwowano!")
      }
    });
  }
  notOnlyWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
