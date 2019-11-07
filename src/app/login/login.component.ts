import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router'

export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  loginForm: LoginForm = {
    username: null,
    password: null,
  }
  
  registerForm: RegisterForm = {
    username: null,
    password: null,
    email: null,
    firstName: null,
    lastName: null,
  };

  ngOnInit() {
  }

  navigateToDash() {
    this.router.navigate(['/home'])
    // this.router.navigate(['../movie-details'], { relativeTo: this.route });
  }

  userLogin() {
    // this.userService.userLogin(this.form);
    this.userService.getUserDetails(this.loginForm);
    this.navigateToDash()
  }

  createAccount() {
    this.userService.createNewAccount(this.registerForm)
    this.userService.getUserDetails({username:this.registerForm.username, password: this.registerForm.password});
    this.navigateToDash()
  }


}