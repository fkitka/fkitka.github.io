import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dish } from 'src/app/dishes/dish';
import { DishService } from 'src/app/dishes/dish.service';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit {
  @Input() currentDish!: Dish;
  editDishForm!: FormGroup;
  noWhitespaceRegex = /^(\w+\S+)$/;
  imageRegex = /([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
  constructor(private fb: FormBuilder, private dishService: DishService) { 
  }
  
  ngOnInit(): void {
    this.editDishForm = this.fb.group({
    name: ["", [Validators.maxLength(20)]],
    cuisine: ["", [Validators.maxLength(20)]],
    type: ["", [Validators.maxLength(15)]],
    time: ["", [Validators.maxLength(15)]],
    ingredients:[""],
    amount: [],
    ordered: [],
    price: [],
    description: [""],
    pictures: ["", [Validators.pattern(this.noWhitespaceRegex), Validators.pattern(this.imageRegex)]],
    link: [],
  });
  }
  onSubmit(){
    let formParams = ['name', 'cuisine', 'type','time','ingredients','amount','ordered','price','description','pictures','link'];    
    formParams.forEach(param => {
        if (this.editDishForm.get(param)?.value){
          let dish = this.currentDish;
          switch (param) {
            case 'name':
              dish.name= this.editDishForm.get(param)?.value;
              break;
            case 'cuisine':
              dish.cuisine= this.editDishForm.get(param)?.value;
              break;
            case 'type':
              dish.type= this.editDishForm.get(param)?.value;
              break;
            case 'time':
              dish.time= this.editDishForm.get(param)?.value;
              break;
            case 'ingredients':
              dish.ingredients= this.editDishForm.get(param)?.value;
              break;
            case 'amount':
              dish.amount= this.editDishForm.get(param)?.value;
              break;
            case 'ordered':
              dish.ordered= this.editDishForm.get(param)?.value;
            break;
            case 'price':
              dish.price= this.editDishForm.get(param)?.value;
              break;
            case 'description':
              dish.description= this.editDishForm.get(param)?.value;
              break;
            case 'pictures':
              dish.pictures= this.editDishForm.get(param)?.value;
            break;
            case 'link':
              dish.link= this.editDishForm.get(param)?.value;
              break;
          
            default:
              break;
          }
          this.dishService.updateDish(this.currentDish.key, dish).then(()=> console.log("Dish updated"));
        }
      
    });
    
  }
}
