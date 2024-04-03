import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { ReviewService } from '../services/review.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css'],
})
export class EditReviewComponent implements OnInit {
  reviewForm: FormGroup;
  message = '';
  reviewId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private router: Router // Inject Router
  ) {
    this.reviewForm = new FormGroup({
      movieId: new FormControl(''),
      movieTitle: new FormControl(''),
      movieRelease: new FormControl(''),
      rating: new FormControl(''),
      reviewText: new FormControl(''),
      userId: new FormControl(''),
      userEmail: new FormControl(''),
      posterPath: new FormControl(''),
    });
  }

  ngOnInit() {
    this.reviewId = this.route.snapshot.paramMap.get('reviewId');
    if (this.reviewId) {
      this.reviewService.getReview(this.reviewId).subscribe((review) => {
        this.reviewForm.patchValue({
          movieId: review.movieId,
          movieTitle: review.movieTitle,
          movieRelease: review.movieRelease,
          rating: review.rating,
          reviewText: review.reviewText,
          userId: review.userId,
          userEmail: review.userEmail,
          posterPath: review.poster_path, // Change this line
        });
      });
    }
  }

  onSubmit() {
    if (this.reviewForm.valid && this.reviewId) {
      this.reviewService
        .updateReview(this.reviewId, this.reviewForm.value)
        .then(() => {
          this.message = 'Review updated successfully!';
          // Navigate to /movies/movieId after updating the review
          this.router.navigate([
            '/movies',
            this.reviewForm?.get('movieId')?.value,
          ]);
        });
    }
  }
}
