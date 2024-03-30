import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  reviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('movieId');
    if (movieId) {
      this.reviewService.getReviewsForMovie(movieId).subscribe((reviews) => {
        this.reviews = reviews;
      });
    }
  }
}
