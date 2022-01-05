import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class CounterService{
    private counterSource = new BehaviorSubject(0);
    currentCounter = this.counterSource.asObservable();
    changeCounter(counter: number){
        this.counterSource.next(counter);
    }
}