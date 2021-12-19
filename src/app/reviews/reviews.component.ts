import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from './review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  @Output() counterChange = new EventEmitter<number>();
  addReviewForm = new FormGroup({
    id: new FormControl(this.reviews.length+1),
    name: new FormControl("",[Validators.required, this.notOnlyWhitespaceValidator]),
    title: new FormControl("",[Validators.required, this.notOnlyWhitespaceValidator]),
    content: new FormControl("",[Validators.required, Validators.minLength(50), Validators.maxLength(500), this.notOnlyWhitespaceValidator]),
    date: new FormControl()
  });
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){
      this.reviews.push(this.addReviewForm.value)
      this.counterChange.emit(this.reviews.length);
      this.addReviewForm.reset();
  }
  notOnlyWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || "" ).trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
