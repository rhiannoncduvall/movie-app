import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIDataService } from './api-data.service';
import { APIService } from './api.service';
import { forkJoin } from 'rxjs'
import { Title } from '@angular/platform-browser';

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
    private apiService: APIService,
  ) { }

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
  userFavorites: any[];

  // results from the favorites request
  favoriteMovieDetails: any[];


// post request to create new user
  postNewUser(newUser) {
    return this.http.post(`http://localhost:3000/api/appUsers`, newUser);
  }

// post request to log in user
  postLogin(credentials) {
    return this.http.post("http://localhost:3000/api/appUsers/login", credentials)
  }

// get request to gather user details after login
  getUserCredentials() {
    return this.http.get(`http://localhost:3000/api/appUsers/${sessionStorage.getItem('userId')}?access_token=${sessionStorage.getItem('token')}`)
    // {headers: new HttpHeaders().set('Authorization', sessionStorage.getItem('token'))})
  }

  // postLogout(token: string) {
  //   return this.http.post(`http://localhost:3000/api/appUsers/logout/?access_token=${token}`, {});
  // }

// post request to log out user
  postLogout() {
    return this.http.post(`http://localhost:3000/api/appUsers/logout?access_token=${sessionStorage.getItem('token')}`, {});
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

  // subscribe for create new account post request
  createNewAccount(newUser) {
    this.postNewUser(newUser)
      .subscribe((res: LoginResponse) => {
        if (res["error"]["statusCode"] === 422) {
          return console.log(res["error"]["messages"])
        }
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('userId', res.userId);
        sessionStorage.setItem('loginResponseId', res.id);
        this.populateSessionStorage();
      })
  }

// subscribe for log out post request
  logoutUser() {
    this.postLogout()
      .subscribe((res) => {
      this.clearUserInfo();
    }, (error) => {console.log(error)})

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
        sessionStorage.setItem('userId', res.id);
        this.user = res;
      });
  }


// isLoggedIn: boolean = false;

// post request for adding a movie to the DB and to the user's favorites
// ** change parameters to pass through movie_id and title as an object**
  postMovie(movie_id: number, title: string) {
    return this.http.post(`http://localhost:3000/api/appUsers/${this.user.id}/movies?access_token=${sessionStorage.getItem('token')}`, {"title": title, "movie_id": movie_id});
  }

// subscribe to post request adding a movie to user's favorites on DB
// ** change parameters to pass through movie_id and title as an object**
  addFavoriteMovie(movie_id: number, title: string) {
    this.postMovie(movie_id, title)
      .subscribe((res) => {
        alert("Added to favorites")
    }, (error) => {console.log(error)})
  }

// get request for grabbing all movies in a user's favorites on the DB
  getUserMovies() {
    return this.http.get(`http://localhost:3000/api/appUsers/${sessionStorage.getItem('userId')}/movies?access_token=${sessionStorage.getItem('token')}`)
  }

  displayFavoriteMovies(favMoviesResponse: any[]) {
    const favMovies = favMoviesResponse.map(movie_id => this.apiService.getMoviesById(movie_id));
    return forkJoin(favMovies);
  }

// subscribe to get request for all fav movies
// takes an object of all fav movies and outputs an array of movie_ids as numbers
  getFavoriteMovies() {
    this.movieService.pageLoading = true;
    let res_ids = [];
    this.getUserMovies()
      .subscribe((res) => {
        for (let i in res) {
          res_ids.push(res[i].movie_id);
        }
    this.userFavorites = [...new Set(res_ids)];
    this.displayFavoriteMovies(this.userFavorites)
      .subscribe((res) => {
        this.favoriteMovieDetails = res;
        console.log(this.favoriteMovieDetails)
        this.movieService.pageLoading = false;
    })
    })
  }


}