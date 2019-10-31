import { Injectable } from '@angular/core';
import { APIService } from './api.service';


export interface ApiResponse { // middle man
  results: Movie[];
}

export interface Movie {
  title: string;
  release_date: string;
  genre_ids: [];
  id: number;
  poster_path: string;
  overview: string;
  vote_average: number;
  name: string;
  // user_id: string;
}

@Injectable({
  providedIn: 'root'
})

export class APIDataService {
  data: Movie[];
  imgBaseUrl: string = "https://image.tmdb.org/t/p/w300/";
  pageTitle: string;
  searchKeywords: string;

  constructor(public apiService: APIService) { }

  displayMovies(category, title) {
    this.pageTitle = title;
    this.apiService.getMoviesByCategory(category)
      .subscribe((res: ApiResponse) => {
        this.data = res.results;

        // this.data.forEach((movie) => {
        // console.log(movie)
        // });
      })
  } 

  searchMoviesByKeyword(title: string) {
    this.pageTitle = title;
    this.apiService.getMoviesBySearch(this.searchKeywords)
      .subscribe((res: ApiResponse) => {
        this.data = res.results;
    });
  }

  displayGenre(genreId: number, title: string) {
    this.pageTitle = title;
    this.apiService.getByGenre(genreId)
      .subscribe((res: ApiResponse) => {
        this.data = res.results;
    });
  }

}