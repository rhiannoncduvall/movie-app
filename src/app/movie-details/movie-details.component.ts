import { Component, OnInit } from '@angular/core';
import { APIDataService } from '../api-data.service';
import { Router, ActivatedRoute, Params, ParamMap} from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UserService } from '../user.service';
import { MovieDetails } from '../api-data.service';
import { APIService } from '../api.service';


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
    runtime: 0,
    tagline: '',
    vote_average: 0,
    id: 0,
    production_companies: [],
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
      })
  }

  addToFavorites(movie_id: number) {
    this.userService.addFavoriteMovie(movie_id, this.movieService.movieDetails.title)
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