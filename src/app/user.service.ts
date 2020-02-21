import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { APIDataService } from './api-data.service';
import { APIService } from './api.service';
import { forkJoin } from 'rxjs';
import { FavMovie } from './movie-details/movie-details.component';
import { RegisterForm } from './login/login.component';

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

interface FavoriteMovieData { 
  results: FavMovie[]
}

export interface FavoriteMovies {
  title: string;
  genres: any[];
  imdb_id: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  tagline: string;
  vote_average: number;
  id: number;
  production_companies: any[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  data: UserInfo;

  constructor(
    public http: HttpClient,
    private movieService: APIDataService,
  ) { }

  baseUrl: string = "https://rcd-movie-app.herokuapp.com/api/";
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
  userFavorites: any[];
  favoriteMovieDetails: any;
  

// post request to create new user
  postNewUser(newUser: RegisterForm) {
    return this.http.post(`${this.baseUrl}appUsers`, newUser);
  }

// post request to log in user
  postLogin(credentials: LoginForm) {
    return this.http.post(`${this.baseUrl}appUsers/login`, credentials)
  }

// get request to gather user details after login
  getUserCredentials() {
    return this.http.get(`${this.baseUrl}appUsers/${sessionStorage.getItem('userId')}?access_token=${sessionStorage.getItem('token')}`)
    // {headers: new HttpHeaders().set('Authorization', sessionStorage.getItem('token'))})
  }

// post request to log out user
  postLogout() {
    return this.http.post(`${this.baseUrl}appUsers/logout?access_token=${sessionStorage.getItem('token')}`, {});
  }

// clearing stored information after a user logs out
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


// HttpErrorResponse
// error:
// error:
// details:
// codes:
// email: ["presence"]
// firstName: ["presence"]
// lastName: ["presence"]
// username: ["uniqueness"]

  // subscribe for create new account post request
  createNewAccount(newUser) {
    this.postNewUser(newUser)
      .subscribe(
        (res: LoginResponse) => {
          this.getUserDetails(newUser)
          this.user.firstName = newUser.firstName;
          this.user.lastName = newUser.lastName;
          this.user.email = newUser.email;
      },
      (error) => {
        console.log(error.error.details.messages)
        // let httpError = JSON.stringify(error.error)
        // JSON.parse(httpError, (key, value) => {
        //   if (key === 'codes') {
        //     console.log(`${key}: ${value}`)
          // }
        });
      // })
  }

// subscribe for log out post request
  logoutUser() {
    this.postLogout()
      .subscribe((res) => {
      this.clearUserInfo();
    }, (error: HttpErrorResponse) => {(error)})

  }

// subscribe for post request for login
  getUserDetails(credentials) {
    this.postLogin(credentials)
      .subscribe((res: LoginResponse) => {
        this.isLoggedIn = true;
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('userId', res.userId);
        sessionStorage.setItem('loginResponseId', res.id);
        this.populateSessionStorage();
      });
  }

// subscribe for get request to gather user credentials required for login
  populateSessionStorage() {
    this.getUserCredentials()
      .subscribe((res: UserInfo) => {
        this.isLoggedIn = true;
        sessionStorage.setItem('username', res.username);
        sessionStorage.setItem('email', res.email);
        sessionStorage.setItem('firstName', res.firstName);
        sessionStorage.setItem('lastName', res.lastName);
        this.user = res;
      });
  }

// post request for adding a movie to the DB and to the user's favorites
  addFavoriteMovie(favMovie: FavMovie) {
    return this.http.post(`${this.baseUrl}appUsers/${this.user.id}/movies?access_token=${sessionStorage.getItem('token')}`, favMovie);
  }

  deleteFavMovie(movie_id: string) {
    return this.http.delete(`${this.baseUrl}appUsers/${sessionStorage.getItem('userId')}/movies/${movie_id}?access_token=${sessionStorage.getItem('token')}`)
  }

// get request for grabbing all movies in a user's favorites on the DB
  getUserMovies() {
    return this.http.get(`${this.baseUrl}appUsers/${sessionStorage.getItem('userId')}/movies?access_token=${sessionStorage.getItem('token')}`)
  }

  getFavoriteMovies() {
    this.movieService.pageLoading = true;
    this.getUserMovies()
      .subscribe((res: FavoriteMovieData) => {
        this.favoriteMovieDetails = res;
        this.movieService.pageLoading = false;
    })
  }


}