import { Component, OnInit } from '@angular/core';
import { APIDataService } from '../api-data.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(public movieService: APIDataService) { }

  ngOnInit() {
  }

}
