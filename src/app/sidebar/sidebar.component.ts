import { Component, OnInit } from '@angular/core';
import { APIDataService } from '../api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    public movieService: APIDataService,
    public router: Router) { }

  ngOnInit() {
  }

  showGenre(genreId: number, title: string) {
    this.movieService.displayGenre(genreId, title)
  }


 // if this.movieService.pageTitle === nav-link then add class="active"


}