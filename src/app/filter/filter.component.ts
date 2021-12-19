import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { cuisines } from '../cuisines';
import { times } from '../times';
import { types } from '../types';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  cuisines = cuisines;
  selectedCuisine = "";
  @Output() cuisineChange = new EventEmitter<string>();
  
  selectedType = "";
  types = types;
  @Output() typeChange = new EventEmitter<string>();
  
  selectedTime = "";
  times = times;
  @Output() timeChange = new EventEmitter<string>();
  
  selectedRating = 0;
  rating = [0,1,2,3,4,5];
  @Output() ratingChange = new EventEmitter<number>();

  filters = ["typ kuchni", "typ dania", "kategoria dania", "ocena"];
  selectedFilter = "";
  @Output() filterReset = new EventEmitter<null>();
  constructor() { 
  }

  ngOnInit(): void {
  }
  selectFilter(filter: string){
    this.selectedFilter = filter;
  }
  onCuisineChange(cuisine: string){
    this.cuisineChange.emit(cuisine);
  }
  onTypeChange(type: string){
    this.typeChange.emit(type)
  }
  onTimeChange(time: string){
    this.timeChange.emit(time);
  }
  onRatingChange(rate: number){
    this.ratingChange.emit(rate);
  }
  resetFilter(){
    this.filterReset.emit();
  }
}