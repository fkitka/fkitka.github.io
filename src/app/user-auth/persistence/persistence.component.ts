import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-persistence',
  templateUrl: './persistence.component.html',
  styleUrls: ['./persistence.component.css']
})
export class PersistenceComponent implements OnInit {
  authService: any;

  constructor(authService: AuthenticationService) { }

  ngOnInit(): void {
  }
  setPersistence(type: string){
    return this.authService.setPersistence(type);
  }
}
