import { Component, OnInit } from '@angular/core';
import { APIDataService } from '../api-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public movieService: APIDataService) { }

  ngOnInit() {
  }

  showGenre(genreId: number, title: string) {
    this.movieService.displayGenre(genreId, title)
  }

}