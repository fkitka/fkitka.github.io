import { Component, OnInit } from '@angular/core';
import { DISHES } from './dishes-list';
import { Dish } from './dish';
import { Currency } from '../currency/currency';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  onOrder: number;
  menuItems: Dish[];
  dishes = DISHES;
  currentCurrency: any;
  maxPriceDish: Dish;
  minPriceDish: Dish;
  // cuisines: String[];
  // types: String[];
  // times: String[];
  // filterCategory: string;
  // filterValue: any;
  constructor() { 
    this.currentCurrency = {"symbol": "$", "converter": 1};
    this.onOrder = 0;
    this.menuItems = [];
    this.minPriceDish = this.getMinPriceDish();
    this.maxPriceDish = this.getMaxPriceDish();
    // this.cuisines = [];
    // this.types = [];
    // this.times = [];
    // this.filterCategory = "";
    // this.filterValue = "";
  }

  ngOnInit(): void {
    // this.setCuisines();
    // this.setTypes();
    // this.setTimes();
  }
  // getDishes(){
  //   return this.dishes;
  // }
  // setCuisines(){
  //   this.dishes.forEach(dish => {
  //     if (this.cuisines.indexOf(dish.cuisine) == -1){
  //       this.cuisines.push(dish.cuisine)
  //     }
  //   });
  // }
  // setTypes(){
  //   this.dishes.forEach(dish => {
  //     if (this.types.indexOf(dish.type) == -1){
  //       this.types.push(dish.type)
  //     }
  //   });
  // }
  // setTimes(){
  //   this.dishes.forEach(dish => {
  //     if (this.times.indexOf(dish.time) == -1){
  //       this.times.push(dish.time)
  //     }
  //   });
  // }
  setCurrency(currency: Currency){
    this.currentCurrency = currency;
  }

  getMinPriceDish(): Dish{
    return this.dishes.slice(0).sort((a, b)=> (a.price-b.price))[0];
  }
  getMaxPriceDish(): Dish{
    return this.dishes.slice(0).sort((a, b)=>(a.price-b.price))[this.dishes.length-1];
  }

  onItemRemoved(dish: Dish){
    let i = this.menuItems.indexOf(dish);
    this.menuItems.splice(i, 1);
    console.log(this.menuItems);
    this.minPriceDish = this.getMinPriceDish();
    this.maxPriceDish = this.getMaxPriceDish();
  }
  onOrderChange(value: number) {
    this.onOrder -= value;
  }
  // setFilterCategory(category: string){
  //   this.filterCategory = category;
  //   console.log(this.filterCategory);
  // }
  // setFilterValue(value: any){
  //   this.filterValue = value;
  // } 
  // reloadDishes(){
  // }
  // filterProducts = (dish: Dish) => {
  //   switch(this.filterCategory){
  //     case "cuisine": return dish.cuisine == this.filterValue;
  //     case "type": return dish.type == this.filterValue;
  //     case "time": return dish.time == this.filterValue;
  //     case "rating": return dish.rating == this.filterValue;
  //   }
  //   return true;
  // }
}
