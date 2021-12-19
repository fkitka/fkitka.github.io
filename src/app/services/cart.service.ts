import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Dish } from "../dishes/dish";



@Injectable()
export class CartService {
    items: Dish[] = [];
    private itemsSource = new BehaviorSubject(this.items);
    currentItems = this.itemsSource.asObservable();
    constructor() { }
    changeItems(items: Dish[]){
        this.itemsSource.next(items);
    }
}
