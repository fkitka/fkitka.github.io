import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private userService: UserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userData
    .pipe(switchMap(user => this.userService.getUser(user?.uid)))
    .pipe(map(appUser => appUser.admin));
  
  }
  
}
