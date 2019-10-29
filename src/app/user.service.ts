import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserInfoBind {
  results: UserInfo;
}

export interface LoginForm {
  username: string,
  password: string;
}

export interface LoginResponse {
  email: string,
  firstName: string,
  lastName: string,
  username: string,
  id: string,
  token: string,
  userId: string,
}

export interface UserInfo {
  email: string,
  firstName: string,
  lastName: string,
  username: string,
  id: string,
}

// export interface newUserInfo {
//   email: string,
//   firstName: string,
//   lastName: string,
//   username: string,
//   password: string;
// }

@Injectable({
  providedIn: 'root'
})
export class UserService {
  data: UserInfo;

  constructor(public http: HttpClient) { }

  baseUrl: string = "http://localhost:3000/api/";
  appUserUrl: string = "appUsers/";
  loginUrl: string = "appUsers/login";

  user: UserInfo = {
    email: null,
    firstName: null,
    lastName: null,
    username: null,
    id: null,
  }

  // post 
  // http://localhost:3000/api/appUsers/login


  postNewUser(newUser) {
    return this.http.post(`http://localhost:3000/api/appUsers`, newUser);
  }

  postLogin(credentials) {
    return this.http.post("http://localhost:3000/api/appUsers/login", credentials)
  }

  getUserCredentials(userId: string) {
    return this.http.get(`http://localhost:3000/api/appUsers/${userId}`)
  }

  postLogout(token: string) {
    return this.http.post(`http://localhost:3000/api/appUsers/logout/?access_token=${token}`, function (err) {
      console.log(err || 'logged out');
    });
  }

  createNewAccount(newUser) {
    this.postNewUser(newUser)
      .subscribe((res: LoginResponse) => {
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('userId', res.userId);
        sessionStorage.setItem('loginResponseId', res.id);
        this.populateSessionStorage();
      })
  }

  logoutUser() {
    this.postLogout(sessionStorage.getItem('token')).subscribe((res) => {
      console.log(res);
      sessionStorage.clear()
    })

  }

  // getUserDetails() {
  //   this.userLogin()
  //     .subscribe((res: UserInfoBind) => {

  //       this.data = res;
  //       console.log(res.results.username)
  //       console.log(this.data)
  //   });
  // }

  getUserDetails(credentials) {
    this.postLogin(credentials)
      .subscribe((res: LoginResponse) => {
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('userId', res.userId);
        sessionStorage.setItem('loginResponseId', res.id);
        this.populateSessionStorage();
      });
  }


  populateSessionStorage() {
    this.getUserCredentials(sessionStorage.userId)
      .subscribe((res: UserInfo) => {
        sessionStorage.setItem('username', res.username);
        sessionStorage.setItem('email', res.email);
        sessionStorage.setItem('firstName', res.firstName);
        sessionStorage.setItem('lastName', res.lastName);
        sessionStorage.setItem('userId', res.id);
        this.user = res;
      });
  }

}
