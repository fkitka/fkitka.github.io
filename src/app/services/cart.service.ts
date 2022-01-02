import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { Dish } from "../dishes/dish";
import { DishService } from "./dish.service";



@Injectable()
export class CartService {
    items: Dish[] = [];
    dishes!: Dish[];
    private itemsSource = new BehaviorSubject(this.items);
    currentItems = this.itemsSource.asObservable();
    constructor(private dishService: DishService) {

    }
    changeItems(){
        this.getDishesList()
    }
    getCurrentItems(dishes: Dish[]): Dish[] {
        let currentItems: Dish[] = [];
        dishes.forEach(dish => {
            if(dish.ordered > 0){
                currentItems.push(dish)
                console.log(dish)
            }
        });
        return currentItems;
    }
    getDishesList(){
        this.dishService.getDishesList().snapshotChanges().pipe(
            map(changes => 
              changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
            )
          ).subscribe(dishes =>{
            this.dishes = (<Dish[]>dishes);
            this.itemsSource.next(this.getCurrentItems(this.dishes))
        });
    }
}
