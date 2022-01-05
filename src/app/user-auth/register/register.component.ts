import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email = "";
  password = "";
  form!: FormGroup;
  

  constructor(private authService: AuthenticationService, private router: Router, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  getEmail() {
    return this.form.get('email');
  }

  getPassword() {
    return this.form.get('password');
  }

  onSubmit() {
    this.authService
      .register(this.getEmail()?.value, this.getPassword()?.value)
      .then(() => this.router.navigate(['']))
      .catch((e) => console.log(e.message));
  }
}
