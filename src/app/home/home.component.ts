import { Component, OnInit } from '@angular/core';
import { APIDataService } from '../api-data.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topRatedMovies: string = "/movie/top_rated";
  pageTitle: string;
  maxWordCountForOverView: number = 50;

  constructor(public movieService: APIDataService, private router: Router, private route: ActivatedRoute) { }


  showTopRatedMovies(pageTitle: string) {
    this.movieService.displayMovies(this.topRatedMovies, pageTitle)
    }

  navigateToMovieDetails(id) {
    this.router.navigate(['/movie-details'])
    // this.router.navigate(['../movie-details'], { relativeTo: this.route });
  }


  ngOnInit() {
    this.movieService.displayMovies(this.topRatedMovies, 'Top Rated');
  }


  // changeStatus(task) {
  //   let index = this.taskList.indexOf(task);
  //   this.taskList[index].isDone = true;
  // }

}
