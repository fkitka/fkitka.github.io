import { Injectable } from "@angular/core";
import { Dish } from "../dishes/dish";

@Injectable()
export class DishService {
    dish!: Dish;
    dishes!: Dish[];
    constructor() { 
    }
    setCurrentDish(dish: Dish){
        this.dish = dish;
    }
 
}
