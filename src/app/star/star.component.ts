import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  @Input() starID!: number;
  @Input() rating!: number;

  @Output() starEnter = new EventEmitter<number>();
  @Output() starLeave = new EventEmitter<null>();
  @Output() starClicked = new EventEmitter<number>();



  constructor() { }

  ngOnInit(): void {
  }
  onStarClicked(){
    this.starClicked.emit(this.starID);
  }
}
