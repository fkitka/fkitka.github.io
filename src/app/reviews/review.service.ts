import { Injectable } from "@angular/core";
import { AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { BehaviorSubject, map } from "rxjs";
import { Dish } from "../dishes/dish";
import { DishService } from "../dishes/dish.service";
import { AuthenticationService } from "../user-auth/authentication.service";
import { Review } from "./review";
import firestore from 'firebase/compat/app'

@Injectable()
export class ReviewService {
    private ratingSource = new BehaviorSubject(0);
    currentDishRating = this.ratingSource.asObservable();
    reviewsRef: any;
    userID!: string;
    currentReviewRating: number = 0;
    constructor(private dishService: DishService,
         private authService: AuthenticationService,
         ){
        this.authService.userData.subscribe(user => {
            this.userID = user!.uid;
        });
    }
    setCurrentDishReviews(dish: Dish){
        this.ratingSource.next(dish.rating);
        this.reviewsRef = this.dishService.getDishDoc(dish.key).collection('reviews');
    }
    getReviews(): AngularFirestoreCollection{
        return this.reviewsRef;
    }
    addReview(review: Review, dish: Dish, reviewsLength: number){
        return this.reviewsRef.doc(this.userID).get().pipe(map((snapshot: firestore.firestore.DocumentSnapshot<firestore.firestore.DocumentData>) => {
            return snapshot.exists;
        })).subscribe((exist: boolean) => {
            if (!exist) {
                this.reviewsRef.doc(this.userID).set({...review});
                let someDish = dish;
                someDish.rating = (dish.rating*(reviewsLength-1) + review.rating) / reviewsLength;
                this.ratingSource.next(someDish.rating);
                this.dishService.updateDish(dish.key, someDish)
            }
            else{
                console.log("You've already created a review");
            }
        });
    }
    setReviewsRating(rating: number) {
        this.currentReviewRating = rating;
    }
    getRating() {
        return this.currentReviewRating;
    }
    
}