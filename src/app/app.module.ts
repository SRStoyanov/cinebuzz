import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeroComponent } from './hero/hero.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { WriteReviewComponent } from './write-review/write-review.component';

// Import HttpClientModule
import { HttpClientModule } from '@angular/common/http';
import { ReviewSummaryComponent } from './review-summary/review-summary.component';
import { LatestReviewsComponent } from './latest-reviews/latest-reviews.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeroComponent,
    ReviewListComponent,
    ReviewDetailComponent,
    MovieDetailComponent,
    UserProfileComponent,
    NavbarComponent,
    RegisterComponent,
    SearchResultsComponent,
    WriteReviewComponent,
    ReviewSummaryComponent,
    LatestReviewsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, // Add this line
  ],
  providers: [AuthService, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
