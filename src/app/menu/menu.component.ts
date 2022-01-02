import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../user-auth/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  authService: AuthenticationService;
  constructor(authService: AuthenticationService, private router: Router) { 
    this.authService = authService;
  }

  ngOnInit(): void {
  }
  logout(){
    this.authService
    .logout()
    .then(() => this.router.navigate(['']))
    .catch((e) => console.log(e.message));
  }
}
