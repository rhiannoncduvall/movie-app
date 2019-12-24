import { Component, OnInit } from '@angular/core';
import { APIDataService } from '../api-data.service';
import { Router, ActivatedRoute, Params, ParamMap} from '@angular/router';
import { UserService } from '../user.service';
import { MovieDetails } from '../api-data.service';
import { APIService } from '../api.service';

export interface FavMovie {
  title: string,
  movie_id: number,
  release_date: string,
  vote_average: number,
  poster_path: string,
  overview: string
}

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie_id: number;
  movie_title: string;
  userId: string = sessionStorage.getItem('userId')


  movieDetails: MovieDetails = {
    title: '',
    genres: [],
    imdb_id: '',
    overview: '',
    poster_path: '',
    release_date: '',
    runtime: null,
    tagline: '',
    vote_average: null,
    id: null,
    production_companies: [],
  }

  favMovie: FavMovie = {
    title: '',
    movie_id: null,
    release_date: '',
    vote_average: null,
    poster_path: '',
    overview: ''
  }


  constructor(
    public movieService: APIDataService, 
    public apiService: APIService,
    private router: Router, 
    private actRoute: ActivatedRoute,
    public userService: UserService) {
      this.movie_id = this.actRoute.snapshot.params.id;
     }



  ngOnInit() {
  // make parameter with movie id and then load the movie details here 
  // this.router.navigate([`/movie-details/${movie_id}`]);

  // this.movieService.displayMovieDetails(movie_id, title);

    this.displayMovieDetails(this.movie_id)
  }

  displayMovieDetails(movie_id: number) {
    this.movieService.pageLoading = true;
    this.apiService.getMoviesById(movie_id)
      .subscribe((res: MovieDetails) => {
        this.movieDetails = res;
        this.movieService.pageLoading = false;
        console.log(this.movieDetails)
        this.favMovie = {
          title: this.movieDetails.title,
          movie_id: this.movieDetails.id,
          release_date: this.movieDetails.release_date,
          vote_average: this.movieDetails.vote_average,
          poster_path: this.movieDetails.poster_path,
          overview: this.movieDetails.overview,
        }
      })
  }

  addToFavorites() {
    this.userService.addFavoriteMovie(this.favMovie)
  }

  navigateToHome() {
    // this.router.navigate(['/movie-details']);
    this.router.navigate(['/home']);

    // this.movieService.displayMovieDetails(movie_id, title);
    // this.router.navigate(['../movie-details'], { relativeTo: this.route });
  }

  showGenre(genreId: number, title: string) {
    this.movieService.displayGenre(genreId, title)
  }

}