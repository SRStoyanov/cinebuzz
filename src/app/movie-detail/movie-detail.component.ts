// src/app/movie-detail/movie-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movieId!: string;
  reviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('movieId')!;
    this.reviewService
      .getReviews({ movieId: this.movieId })
      .subscribe((reviews: any[]) => {
        this.reviews = reviews;
      });
  }
}
