import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { APIDataService } from '../api-data.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(
    private userService: UserService,
    private movieService: APIDataService,
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
