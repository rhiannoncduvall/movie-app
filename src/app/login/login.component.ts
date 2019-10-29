import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

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

  constructor(public userService: UserService) { }

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

  userLogin() {
    // this.userService.userLogin(this.form);
    this.userService.getUserDetails(this.loginForm);
  }

  createAccount() {
    this.userService.createNewAccount(this.registerForm)
  }


}