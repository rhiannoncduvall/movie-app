import { Component, OnInit } from '@angular/core';
import { APIDataService } from '../api-data.service';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  popularMovies: string = "/movie/popular";
  nowPlayingMovies: string = "/movie/now_playing";
  keywords: string;

  constructor(public movieService: APIDataService, private router: Router, private route: ActivatedRoute, public userService: UserService) { }

  ngOnInit() { }


  showPopularMovies(pageTitle: string){
    this.movieService.displayMovies(this.popularMovies, pageTitle);
  }

  showNowPlayingMovies(pageTitle: string) {
    this.movieService.displayMovies(this.nowPlayingMovies, pageTitle)
    }

  showSearchResults(pageTitle: string) {
    this.router.navigate(['/home'])
    this.movieService.searchMoviesByKeyword(pageTitle);
    }

    logout() {
      this.userService.logoutUser();
      console.log(this.userService.isLoggedIn)
    }


    navigateToDash() {
      this.router.navigate(['/home'])
      // this.router.navigate(['../movie-details'], { relativeTo: this.route });
    }


    AccountMenu() {
      
    }

}