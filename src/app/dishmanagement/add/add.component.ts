import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../../dishes/dish';
import { DishService } from '../../dishes/dish.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent{
  @Input() isHidden = true;
  noWhitespaceRegex = /^(\w+\S+)$/;
  imageRegex = /([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
  addDishForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(20), this.notOnlyWhitespaceValidator]),
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
  dishes!: Dish[];
  menuItems: Dish[] = [];
  subscription: any;
  counter = 0;

  constructor(private dishService: DishService) { }

  
  notOnlyWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || "" ).trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  onSubmit(){
    console.log(this.addDishForm.value)
    this.dishService.createDish(this.addDishForm.value).then(() =>console.log("Dish successfully created"));
    this.addDishForm.reset();
  }
  

}
