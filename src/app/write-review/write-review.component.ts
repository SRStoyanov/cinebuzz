import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { AuthService } from '../services/auth.service';
import { MovieDbService } from '../services/movie-db.service';
import { debounceTime, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css'],
})
export class WriteReviewComponent implements OnInit {
  reviewForm: FormGroup;
  searchResults: Movie[] = [];
  message = '';
  moviePosterUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private authService: AuthService,
    private movieDbService: MovieDbService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.reviewForm = this.formBuilder.group({
      movieSearch: '',
      movieId: ['', Validators.required],
      movieTitle: ['', Validators.required],
      movieYear: ['', Validators.required],
      userRating: [null, [Validators.min(1), Validators.max(5)]],
      reviewText: ['', Validators.required],
      userId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.reviewForm.get('userId')?.setValue(user.uid);
      }
    });

    const movieId = this.route.snapshot.paramMap.get('movieId');
    if (movieId) {
      this.movieDbService.getMovieDetails(+movieId).subscribe((movie: any) => {
        if (movie && movie.title && movie.releaseYear) {
          this.reviewForm.patchValue({
            movieId: movieId,
            movieTitle: movie.title,
            movieYear: movie.releaseYear.slice(0, 4),
          });
          this.moviePosterUrl = movie.posterPath;
        }
      });
    }

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

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value;

    if (searchValue) {
      this.movieDbService
        .searchMovie(searchValue)
        .subscribe((response: any) => {
          this.searchResults = response.results.slice(0, 10);
        });
    } else {
      this.searchResults = [];
    }
  }

  onMovieSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedMovie = this.searchResults.find(
      (movie) => movie.id === Number(target.value)
    );

    if (selectedMovie) {
      this.reviewForm.patchValue({
        movieId: selectedMovie.id.toString(),
        movieTitle: selectedMovie.title,
        movieYear: selectedMovie.release_date.slice(0, 4),
      });
      this.moviePosterUrl =
        'https://image.tmdb.org/t/p/w500' + selectedMovie.poster_path;
    }
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const review = {
        movieId: this.reviewForm.value.movieId || '',
        movieTitle: this.reviewForm.value.movieTitle || '',
        movieRelease: this.reviewForm.value.movieYear || '',
        rating: Number(this.reviewForm.value.userRating) || 0,
        reviewText: this.reviewForm.value.reviewText || '',
        userId: this.reviewForm.value.userId || '',
        poster_path: this.moviePosterUrl.replace(
          'https://image.tmdb.org/t/p/w500',
          ''
        ),
      };

      const reviewId = this.route.snapshot.paramMap.get('id');
      if (reviewId) {
        this.reviewService.updateReview(reviewId, review).then(() => {
          this.message = 'Review updated successfully';
          this.router.navigate(['/movies', review.movieId]);
        });
      } else {
        this.reviewService.createReview(review).then(() => {
          this.reviewForm.reset();
          this.message = 'Review created successfully';
          this.router.navigate(['/movies', review.movieId]);
        });
      }
    } else {
      this.message = 'Please fill in all fields';
    }
  }
}
