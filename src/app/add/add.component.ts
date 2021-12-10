import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DISHES } from '../dishes/dishes-list';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  isHidden: boolean;
  noWhitespaceRegex = /^(\w+\S+)$/;
  imageRegex = /([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
  addDishForm = new FormGroup({
    id: new FormControl(DISHES.length+1),
    name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(15), this.notOnlyWhitespaceValidator]),
    cuisine: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(20), this.notOnlyWhitespaceValidator]),
    type: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(15), this.notOnlyWhitespaceValidator]),
    time: new FormControl("", [Validators.required,  Validators.minLength(2), Validators.maxLength(15), this.notOnlyWhitespaceValidator]),
    ingredients: new FormControl("", [Validators.required, this.notOnlyWhitespaceValidator]),
    amount: new FormControl("", [Validators.required]),
    ordered: new FormControl(0),
    price: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    pictures: new FormControl("", [Validators.required, Validators.pattern(this.noWhitespaceRegex), Validators.pattern(this.imageRegex)]),
    link: new FormControl(),
  });
  constructor() { this.isHidden = true; }

  
  ngOnInit(): void {
  }
  notOnlyWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || "" ).trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  onSubmit(){
    console.log(DISHES)
    DISHES.push(this.addDishForm.value);
  }
  addDishToggle(){
    this.isHidden = !this.isHidden;
  }
}
