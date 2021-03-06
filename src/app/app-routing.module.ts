import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { LoginComponent } from './login/login.component';
import { FavoritesComponent } from './favorites/favorites.component'
import { PreferencesComponent } from './preferences/preferences.component'


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  { path: 'login', component: LoginComponent},
  { path: 'favorites', component: FavoritesComponent },
  { path: 'preferences', component: PreferencesComponent },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
