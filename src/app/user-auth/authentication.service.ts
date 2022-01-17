import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { map, Observable, switchMap } from 'rxjs';
import { AppUser } from './app-user';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit{
  userData!: Observable<firebase.User | null>;
  readonly authState$: Observable<firebase.User | null> = this.fireAuth.authState;
  isLoggedIn = false;
  currentUser: any;
  isAdmin = false;
  isManager = false;
  constructor(private fireAuth: AngularFireAuth, private userService: UserService) {
    this.userData = fireAuth.authState;
    this.userData.subscribe((User)=>{
      if(User === null){
        this.currentUser = null;
        this.isLoggedIn = false;
      }
      else{
        this.currentUser = User;
        this.isLoggedIn = true;
        this.isUserAdmin();
        this.isUserManager();
      }
    });
  }
  
  ngOnInit(): void {
  }
  setPersistence(type: string) {
    switch (type) {
      case "local":
        return this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);    
      case "none":
        return this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);    
      case "session":
        return this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);    
      default:
        break;
    }
    return null;
    
  }
  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }
  getAppUser(): Observable<AppUser>{
    return this.userData.pipe(switchMap(user => this.userService.getUser(user?.uid)));
  }
  isUserAdmin(){
    return this.getAppUser()
    .pipe(map(user=> user.admin))
    .subscribe(isAdmin=> this.isAdmin = isAdmin);
  }
  isUserManager(){
    return this.getAppUser()
    .pipe(map(user=> user.manager))
    .subscribe(isManager=> this.isManager = isManager);
  }
  register(email: string, password: string) {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('You are signed up!', res);
        this.userService.save(res.user!.uid, res.user!.email!);
      })
      .catch(error => {
        console.log('Something is wrong: ', error.message);
      });
  }

  login(email: string, password: string) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('You are logged in!');
      })
      .catch(err => {
        console.log('Something went wrong: ', err.message);
      });
  }

  logout() {
    return this.fireAuth
      .signOut().then(res => {
        console.log('You logged out!');
        localStorage.clear();
      })
      .catch(err => {
        console.log('Something went wrong: ', err.message);
      })
  }


}
