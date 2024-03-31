import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'reviews/:id', component: ReviewDetailComponent },
  { path: 'movies/:movieId', component: MovieDetailComponent },
  { path: 'users/:uid', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
