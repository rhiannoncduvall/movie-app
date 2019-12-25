import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { APIDataService } from '../api-data.service';
import { Router } from '@angular/router';

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

  showAlertBanner: boolean = false;

  ngOnInit() {
    this.displayFavoriteMovies()
    this.showAlertBanner = false;
  }

  displayFavoriteMovies() {
    if (this.userService.isLoggedIn === true) {
    this.userService.getFavoriteMovies()
  }
  }

  navigateToMovieDetails(movie_id: number) {
    this.router.navigate(['/movie-details/', movie_id]);
  }

  removeFavMovie(movie_id: string) {
    this.onDeleteFavMovie(movie_id);
  }

  onDeleteFavMovie(movie_id: string) {
    this.userService.deleteFavMovie(movie_id).subscribe((_) => {
      this.showAlertBanner = true;
      this.userService.favoriteMovieDetails = null;
      this.displayFavoriteMovies();
    });
  }

  
}