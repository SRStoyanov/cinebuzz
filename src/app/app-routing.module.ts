import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { WriteReviewComponent } from './write-review/write-review.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { EditReviewComponent } from './edit-review/edit-review.component';
import { LoginGuardService } from './services/login-guard.service';

// Define the routes for the application
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService], // Guard to prevent logged in users from accessing the login page
  },
  {
    path: 'users/:uid',
    component: UserProfileComponent,
    canActivate: [AuthGuardService], // Guard to prevent unauthenticated users from accessing user profiles
  },
  { path: 'movies/:movieId', component: MovieDetailComponent },
  {
    path: 'write-review',
    component: WriteReviewComponent,
    canActivate: [AuthGuardService], // Guard to prevent unauthenticated users from writing a review
  },
  {
    path: 'write-review/:movieId',
    component: WriteReviewComponent,
    canActivate: [AuthGuardService], // Guard to prevent unauthenticated users from writing a review
  },
  { path: 'edit-review/:reviewId', component: EditReviewComponent },
  { path: '**', component: HomeComponent }, // Fallback route to home component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
