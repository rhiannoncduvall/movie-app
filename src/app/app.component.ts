import { Component } from '@angular/core';
import { APIService } from './api.service';
import { APIDataService } from './api-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-app';

  constructor(public api: APIService, public data: APIDataService) {}

}
