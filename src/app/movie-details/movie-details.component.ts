import { Component, OnInit } from '@angular/core';
import { APIDataService } from '../api-data.service';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from '../user.service';
import { MovieDetails } from '../api-data.service';
import { APIService } from '../api.service';
import { HomeComponent } from '../home/home.component';

export interface FavMovie {
  title: string,
  movie_id: number,
  release_date: string,
  vote_average: number,
  poster_path: string,
  overview: string,
  id: string
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
    db_id: ''
  }

  favMovie: FavMovie = {
    title: '',
    movie_id: null,
    release_date: '',
    vote_average: null,
    poster_path: '',
    overview: '',
    id: ''
  }

  showAlertBanner: boolean = false;


  constructor(
    public movieService: APIDataService, 
    public apiService: APIService,
    private router: Router, 
    private actRoute: ActivatedRoute,
    public userService: UserService
  ) {
      this.movie_id = this.actRoute.snapshot.params.id;
     }



  ngOnInit() {
    this.displayMovieDetails(this.movie_id)
  }

  displayMovieDetails(movie_id: number) {
    this.movieService.pageLoading = true;
    this.apiService.getMoviesById(movie_id)
      .subscribe((res: MovieDetails) => {
        this.movieDetails = res;
        this.movieService.pageLoading = false;
        this.favMovie = {
          title: this.movieDetails.title,
          movie_id: this.movieDetails.id,
          release_date: this.movieDetails.release_date,
          vote_average: this.movieDetails.vote_average,
          poster_path: this.movieDetails.poster_path,
          overview: this.movieDetails.overview,
          id: this.movieDetails.db_id
        }
      })
  }

  onAddFavoriteMovie() {
    if (this.userService.isLoggedIn === true) {
    this.userService.addFavoriteMovie(this.favMovie)
      .subscribe((_) => {
        this.showAlertBanner = true;
    }, (error) => {console.log(error)})
  } else {
    alert('Please log in to add favorites.')
  }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
    }

  showGenre(genreId: number, title: string) {
    this.navigateToHome();
    this.movieService.displayGenre(genreId, title);
  }

}