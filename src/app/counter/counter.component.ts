import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { Item } from '../items/item';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  counter = 0;
  subscription: any;
  constructor(private counterService: CounterService, private cartService: CartService) { 
  }
  
  async ngOnInit(): Promise<void> {
    this.subscription = (await this.cartService.getItems()).snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() })))
    ).subscribe(items => {
      this.counter = this.calculateTotalQuantity(<Item[]>items);
    });
    this.counterService.currentCounter.subscribe(counter => this.counter = counter);
  }
  calculateTotalQuantity(items: Item[]) {
    let sum = 0;
    items.forEach(item => {
        sum += item.quantity;
    });
    return sum;
}
}
