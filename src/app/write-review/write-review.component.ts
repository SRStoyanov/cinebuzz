import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReviewService } from '../services/review.service';
import { AuthService } from '../services/auth.service';
import { MovieDbService } from '../services/movie-db.service';
import { debounceTime, switchMap } from 'rxjs/operators';

interface Movie {
  id: number;
  title: string;
  release_date: string;
}

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css'],
})
export class WriteReviewComponent implements OnInit {
  reviewForm = new FormGroup({
    movieSearch: new FormControl(''),
    movieId: new FormControl('', Validators.required),
    movieTitle: new FormControl('', Validators.required),
    movieRelease: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
    reviewText: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
  });

  searchResults: Movie[] = [];
  message = '';

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
    private movieDbService: MovieDbService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.reviewForm.get('userId')?.setValue(user.uid);
      }
    });

    const movieSearchControl = this.reviewForm.get('movieSearch');
    if (movieSearchControl) {
      movieSearchControl.valueChanges
        .pipe(
          debounceTime(300),
          switchMap((movieName) =>
            movieName ? this.movieDbService.searchMovie(movieName) : []
          )
        )
        .subscribe((response: any) => {
          this.searchResults = response.results.slice(0, 10);
        });
    }
  }

  onMovieSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const movieId = target.value;
    const selectedMovie = this.searchResults.find(
      (movie) => movie.id === Number(movieId)
    );
    if (selectedMovie) {
      this.reviewForm.get('movieId')?.setValue(selectedMovie.id.toString());
      this.reviewForm.get('movieTitle')?.setValue(selectedMovie.title);
      this.reviewForm
        .get('movieRelease')
        ?.setValue(selectedMovie.release_date.slice(0, 4));
    }
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const review = {
        movieId: this.reviewForm.value.movieId || '',
        movieTitle: this.reviewForm.value.movieTitle || '',
        movieRelease: this.reviewForm.value.movieRelease || '',
        rating: Number(this.reviewForm.value.rating) || 0,
        reviewText: this.reviewForm.value.reviewText || '',
        userId: this.reviewForm.value.userId || '',
      };

      this.reviewService
        .createReview(review)
        .then(() => {
          this.reviewForm.reset();
          this.message = 'Review created successfully';
        })
        .catch((err) => {
          this.message = 'An error occurred: ' + err.message;
        });
    } else {
      this.message = 'Please fill in all fields';
    }
  }
}
