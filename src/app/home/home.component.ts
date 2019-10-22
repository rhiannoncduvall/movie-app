import { Component, OnInit } from '@angular/core';
import { APIDataService } from '../api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topRatedMovies: string = "/movie/top_rated";
  pageTitle: string;

  constructor(public movieService: APIDataService, private router: Router) { }

  ngOnInit() {
  }

  showTopRatedMovies(pageTitle: string) {
    this.movieService.displayMovies(this.topRatedMovies, pageTitle)
    }



  navigateToMovieDetails() {
    // this.router.navigateByUrl('../movie-details');
    this.router.navigate(['../movie-details'], { relativeTo: this.route });
  }


  // changeStatus(task) {
  //   let index = this.taskList.indexOf(task);
  //   this.taskList[index].isDone = true;
  // }

}
