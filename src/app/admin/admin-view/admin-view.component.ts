import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AppUser } from '../../user-auth/app-user';
import { UserService } from '../../user-auth/user.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  users!: AppUser[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService
    .getRegisteredUsers()
    .snapshotChanges()
    .pipe(map(changes => 
      changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))))
    .subscribe(users => {
      this.users = users;
    });
  }
  ban(user: AppUser){
    this.userService.ban(user);
  }
  unban(user: AppUser){
    this.userService.unban(user);
  }
  setAdmin(user: AppUser){
    this.userService.setAdmin(user);
  }
  unsetAdmin(user: AppUser){
    this.userService.unsetAdmin(user);
  }
  setManager(user: AppUser){
    this.userService.setManager(user);
  }
  unsetManager(user: AppUser){
    this.userService.unsetManager(user);
  }
}
