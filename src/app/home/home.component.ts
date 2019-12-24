import { Component, OnInit } from '@angular/core';
import { APIDataService, Movie } from '../api-data.service';
import { Router, ActivatedRoute} from '@angular/router';
import { APIService } from '../api.service';
import { MovieDetails } from '../api-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topRatedMovies: string = "/movie/top_rated";
  pageTitle: string;
  maxWordCountForOverView: number = 50;
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
    private router: Router, 
    public apiService: APIService,
    private actRoute: ActivatedRoute) { }


  showTopRatedMovies(pageTitle: string) {
    this.movieService.displayMovies(this.topRatedMovies, pageTitle)
    }

  navigateToMovieDetails(movie_id: number) {
    // this.router.navigate(['/movie-details']);
    this.router.navigate(['/movie-details/', movie_id]);
    this.displayMovieDetails(movie_id);

    // this.movieService.displayMovieDetails(movie_id, title);
    // this.router.navigate(['../movie-details'], { relativeTo: this.route });
  }


  ngOnInit() {
    this.movieService.displayMovies(this.topRatedMovies, 'Top Rated');
  }


  // changeStatus(task) {
  //   let index = this.taskList.indexOf(task);
  //   this.taskList[index].isDone = true;
  // }


  displayMovieDetails(movie_id: number, title: string) {
    this.movieService.pageLoading = true;
    this.pageTitle = title;
    this.apiService.getMoviesById(movie_id)
      .subscribe((res: MovieDetails) => {
        this.movieDetails = res;
        this.movieService.pageLoading = false;
      })
  }

}
