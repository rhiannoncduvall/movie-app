import { Component, OnInit } from '@angular/core';
import { APIDataService } from '../api-data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topRatedMovies: string = "/movie/top_rated";
  pageTitle: string;

  constructor(public movieService: APIDataService) { }

  ngOnInit() {
  }

  showTopRatedMovies(pageTitle: string) {
    this.movieService.displayMovies(this.topRatedMovies, pageTitle)
    }

  // changeStatus(task) {
  //   let index = this.taskList.indexOf(task);
  //   this.taskList[index].isDone = true;
  // }

}
