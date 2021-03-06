import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { APIService } from './api.service';
import { APIDataService } from './api-data.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FavoritesComponent } from './favorites/favorites.component';
import { PreferencesComponent } from './preferences/preferences.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    MovieDetailsComponent,
    LoginComponent,
    FavoritesComponent,
    PreferencesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ClarityModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [APIService, APIDataService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
