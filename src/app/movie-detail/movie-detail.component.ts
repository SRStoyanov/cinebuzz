// src/app/movie-detail/movie-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { MovieDbService } from '../services/movie-db.service'; // Import MovieDbService

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movieId!: string;
  movie: any; // This will hold the movie details
  reviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private movieDbService: MovieDbService // Inject MovieDbService
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('movieId')!;
    this.getMovieDetails(this.movieId);
    this.reviewService
      .getReviews({ movieId: this.movieId })
      .subscribe((reviews: any[]) => {
        this.reviews = reviews;
      });
  }

  getMovieDetails(movieId: string): void {
    this.movieDbService.getMovieDetails(+movieId).subscribe((movie: any) => {
      this.movie = movie;
    });
  }
}
