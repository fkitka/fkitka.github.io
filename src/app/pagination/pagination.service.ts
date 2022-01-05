import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class PaginationService {
    private lengthSource = new BehaviorSubject(12);
    elementsLength = this.lengthSource.asObservable();
    private pageSource = new BehaviorSubject(1);
    currentPage = this.pageSource.asObservable();
    private elementSource = new BehaviorSubject(12);
    elementsCount =  this.elementSource.asObservable();
    constructor() { 
    }
    setPageNum(page: number){
        this.pageSource.next(page);

    }
    setElementsCount(count: number){
        this.elementSource.next(count)
    }
    setElementsLength(){

    }
}
