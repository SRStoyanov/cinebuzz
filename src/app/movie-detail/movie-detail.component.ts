import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { MovieDbService } from '../services/movie-db.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movieId!: string;
  movie: any; // Holds the movie details
  reviews: any[] = [];
  averageRating: number = 0; // Holds the average rating
  isLoggedIn = false;

  // Inject services in the constructor
  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private movieDbService: MovieDbService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is logged in
    this.authService.user$.subscribe((user) => {
      this.isLoggedIn = !!user;
    });

    // Get movieId from the route parameters
    this.movieId = this.route.snapshot.paramMap.get('movieId')!;

    // Fetch movie details and reviews
    this.getMovieDetails(this.movieId);
    this.reviewService
      .getReviews({ movieId: this.movieId })
      .subscribe((reviews: any[]) => {
        this.reviews = reviews;
        this.calculateAverageRating(); // Calculate the average rating
      });
  }

  // Fetch movie details from the MovieDbService
  getMovieDetails(movieId: string): void {
    this.movieDbService.getMovieDetails(+movieId).subscribe(
      (movie: any) => {
        this.movie = movie;
      },
      (error) => {
        console.error('Error fetching movie details', error);
        this.router.navigate(['/']); // Redirect to home on error
      }
    );
  }

  // Calculate the average rating of the movie
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
