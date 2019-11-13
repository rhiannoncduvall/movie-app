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
  // genres: any[];

  // user_id: string;
}

// export interface MovieDetailsResponse {
//   results: object;
// }

export interface MovieDetails {
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

export class APIDataService {
  data: Movie[];
  imgBaseUrl: string = "https://image.tmdb.org/t/p/w300/";
  pageTitle: string;
  searchKeywords: string;
  movie_id: number;
  title: string;
  movieDetails: {
    title: string;
    genres: any[];
    imdb_id: string;
    overview: string;
    poster_path: any;
    release_date: string;
    runtime: number;
    tagline: string;
    vote_average: number;
    id: number;
    production_companies: any[];
  };
  pageLoading: boolean = false;

  constructor(public apiService: APIService) { }

  displayMovies(category: string, title: string) {
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

  displayMovieDetails(movie_id: number, title: string) {
    this.pageLoading = true;
    this.pageTitle = title;
    this.apiService.getMoviesById(movie_id)
      .subscribe((res: MovieDetails) => {
        this.movieDetails = res;
        this.pageLoading = false;
      })
  }

}