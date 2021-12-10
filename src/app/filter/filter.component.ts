import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


import { Dish } from '../dishes/dish';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() dishes!: Dish[];
  @Output() dishesChange = new EventEmitter<Dish[]>();
  @Input() cuisines!: String[];
  @Input() types!: String[];
  @Input() times!: String[];
  @Output() selectedValueToFilter = new EventEmitter();
  @Output() selectedCategoryToFilter = new EventEmitter();
  @Output() filter = new EventEmitter();
  selectedCuisine = "";
  selectedType = "";
  selectedTime = "";
  selectedFilter = "";
  selectedRating = 0;
  filters = ["typ kuchni", "typ dania", "kategoria dania", "ocena"];
  constructor() { 
  }

  ngOnInit(): void {
  }
  selectFilter(filter: string){
    this.selectedFilter = filter;
  }
  selectCuisine(cuisine: string){
    this.selectedCuisine = cuisine;
    this.selectedValueToFilter.emit(this.selectedCuisine);
    this.selectedCategoryToFilter.emit("cuisine");
  }
  selectType(type: string){
    this.selectedType = type;
    this.selectedValueToFilter.emit(this.selectedType);
    this.selectedCategoryToFilter.emit("type");
  }
  selectTime(time: string){
    this.selectedType = time;
    this.selectedValueToFilter.emit(this.selectedTime);
    this.selectedCategoryToFilter.emit("time");
  }
  selectRating(rate: number){
    this.selectedRating = rate;
    this.selectedValueToFilter.emit(this.selectedRating);
    this.selectedCategoryToFilter.emit("rating");
  }
  onSubmit(){
    this.filter.emit();
  }
}