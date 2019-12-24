import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { APIDataService } from '../api-data.service';
import { Router } from '@angular/router';
import { FavMovie } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(
    public userService: UserService,
    public movieService: APIDataService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.displayFavoriteMovies()
  }

  displayFavoriteMovies() {
    if (this.userService.isLoggedIn === true) {
    this.userService.getFavoriteMovies()
  }
  }

  navigateToMovieDetails(movie_id: number) {
    // this.router.navigate(['/movie-details']);
    this.router.navigate(['/movie-details/', movie_id]);
  }

  
}
