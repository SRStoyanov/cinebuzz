// src/app/movie-detail/movie-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { MovieDbService } from '../services/movie-db.service'; // Import MovieDbService
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movieId!: string;
  movie: any; // This will hold the movie details
  reviews: any[] = [];
  averageRating: number = 0; // Add a property to hold the average rating
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private movieDbService: MovieDbService, // Inject MovieDbService
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
    this.movieId = this.route.snapshot.paramMap.get('movieId')!;
    this.getMovieDetails(this.movieId);
    this.reviewService
      .getReviews({ movieId: this.movieId })
      .subscribe((reviews: any[]) => {
        this.reviews = reviews;
        this.calculateAverageRating(); // Calculate the average rating after fetching the reviews
      });
  }

  getMovieDetails(movieId: string): void {
    this.movieDbService.getMovieDetails(+movieId).subscribe((movie: any) => {
      this.movie = movie;
    });
  }

  calculateAverageRating(): void {
    if (this.reviews.length > 0) {
      const totalRating = this.reviews.reduce(
        (total, review) => total + review.rating,
        0
      );
      this.averageRating = totalRating / this.reviews.length;
    }
  }
}
