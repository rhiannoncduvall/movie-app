import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "https://api.themoviedb.org/3";
  apiKey: string = "?api_key=287eadf0e2b2be47d6047e0f6f26a2f5";
  language: string = "&language=en-US";
  pageNumber: string = "&page=1";

  getMoviesByCategory(category: string) {
    return this.http.get(`${this.baseUrl}${category}${this.apiKey}${this.language}${this.pageNumber}`)
  }

  getMoviesById(movie_id: number) {
    return this.http.get(`${this.baseUrl}/movie/${movie_id}${this.apiKey}${this.language}`
      )
  }

  getMoviesBySearch(keyword: string) {
    return this.http.get(`${this.baseUrl}/search/multi${this.apiKey}${this.language}&query=${keyword}${this.pageNumber}`)
  }

  getByGenre(genreId: number) {
    return this.http.get(`${this.baseUrl}/discover/movie${this.apiKey}${this.language}&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${genreId}`);
  }
}


// popular
// ${this.baseUrl}/movie/popular?api_key=287eadf0e2b2be47d6047e0f6f26a2f5&language=en-US&page=1


// now Playing
// ${this.baseUrl}/movie/now_playing?api_key=287eadf0e2b2be47d6047e0f6f26a2f5&language=en-US&page=1