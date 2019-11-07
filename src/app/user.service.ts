import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  isLoggedIn: boolean = false;

  // post 
  // http://localhost:3000/api/appUsers/login


  postNewUser(newUser) {
    return this.http.post(`http://localhost:3000/api/appUsers`, newUser);
  }

  postLogin(credentials) {
    return this.http.post("http://localhost:3000/api/appUsers/login", credentials)
  }

  getUserCredentials() {
    return this.http.get(`http://localhost:3000/api/appUsers/${sessionStorage.getItem('userId')}?access_token=${sessionStorage.getItem('token')}`)
    // {headers: new HttpHeaders().set('Authorization', sessionStorage.getItem('token'))})
  }

  // postLogout(token: string) {
  //   return this.http.post(`http://localhost:3000/api/appUsers/logout/?access_token=${token}`, {});
  // }


  postLogout() {
    return this.http.post(`http://localhost:3000/api/appUsers/logout?access_token=${sessionStorage.getItem('token')}`, {});
  }


  clearUserInfo() {
    this.user = {
      email: null,
      firstName: null,
      lastName: null,
      username: null,
      id: null,}
      sessionStorage.clear()
      this.isLoggedIn = false;
  }

  createNewAccount(newUser) {
    this.postNewUser(newUser)
      .subscribe((res: LoginResponse) => {
        console.log(res)
        if (res["error"]["statusCode"] === 422) {
          return console.log(res["error"]["messages"])
        }
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('userId', res.userId);
        sessionStorage.setItem('loginResponseId', res.id);
        this.populateSessionStorage();
      })
  }

  logoutUser() {
    this.postLogout()
      .subscribe((res) => {
      this.clearUserInfo();
    }, (error) => {console.log(error)})

  }

  getUserDetails(credentials) {
    console.log(credentials);
    this.postLogin(credentials)
      .subscribe((res: LoginResponse) => {
        this.isLoggedIn = true;
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('userId', res.userId);
        sessionStorage.setItem('loginResponseId', res.id);
        this.populateSessionStorage();
      });
  }


  populateSessionStorage() {
    this.getUserCredentials()
      .subscribe((res: UserInfo) => {
        this.isLoggedIn = true;
        sessionStorage.setItem('username', res.username);
        sessionStorage.setItem('email', res.email);
        sessionStorage.setItem('firstName', res.firstName);
        sessionStorage.setItem('lastName', res.lastName);
        sessionStorage.setItem('userId', res.id);
        this.user = res;
      });
  }

}