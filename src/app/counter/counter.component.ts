import { Component, OnInit } from '@angular/core';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  counter = 0;
  constructor(private counterService: CounterService) { }

  ngOnInit(): void {
    this.counterService.currentCounter.subscribe(counter => this.counter = counter);
  }
}
