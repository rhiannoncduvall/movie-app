import { Component, OnInit } from '@angular/core';
import { APIDataService } from '../api-data.service';
import { Router, ActivatedRoute, Params, ParamMap} from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UserService } from '../user.service'


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie_id: number;
  movie_title: string;

  constructor(
    public movieService: APIDataService, 
    private router: Router, 
    private actRoute: ActivatedRoute,
    public userService: UserService) {
      this.movie_id = this.actRoute.snapshot.params.id;
     }

  ngOnInit() {
  // make parameter with movie id and then load the movie details here 
  // this.router.navigate([`/movie-details/${movie_id}`]);

  // this.movieService.displayMovieDetails(movie_id, title);
    this.movieService.displayMovieDetails(this.movie_id, this.movieService.title)
  }

  addToFavorites(movie_id: number) {
    this.userService.addFavoriteMovie(movie_id, this.movieService.movieDetails.title)
  }

  // console() {
  //   console.log(this.movieService.movieDetails)
  // }
}
