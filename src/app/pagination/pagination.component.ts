import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  length = 0;
  currentPageNum = 0;
  elementsOnPage = 0;
  numberOfPages = 1;
  constructor(private paginationService: PaginationService, private router: Router, private activeroute: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.paginationService.elementsCount.subscribe(elementsCount => this.elementsOnPage = elementsCount)
    this.paginationService.currentPage.subscribe(currentPage => this.currentPageNum = currentPage);
    this.paginationService.elementsLength.subscribe(length => this.length = length);
    this.activeroute.paramMap.subscribe(params => {
        if (params.get("page") != null){
          let page = +params.get("page")!;
          this.paginationService.setPageNum(page);
        }
    });
  }
  getArray(): number[]{
    return Array.from(Array(this.length), (_,i)=> i)
  }
  setElements(count: number){
    this.paginationService.setElementsCount(count);
    this.numberOfPages = Math.ceil(this.length/this.elementsOnPage + 1);
    this.paginationService.setPageNum(1);
    this.router.navigate(['/dishes', 1]);
  }
  setPageNum(page: number){
    if (page > 0 && page < Math.ceil(this.length/this.elementsOnPage + 1)){
      this.router.navigate(['/dishes', page]);
      this.paginationService.setPageNum(page);
    }
  }
}
