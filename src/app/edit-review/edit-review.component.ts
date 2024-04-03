import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  // Inject ActivatedRoute, ReviewService, and Router in the constructor
  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private router: Router
  ) {
    // Initialize form group for the review form
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
    // Get reviewId from the route parameters
    this.reviewId = this.route.snapshot.paramMap.get('reviewId');
    if (this.reviewId) {
      // If reviewId is present, get the review details and patch the form values
      this.reviewService.getReview(this.reviewId).subscribe((review) => {
        this.reviewForm.patchValue({
          movieId: review.movieId,
          movieTitle: review.movieTitle,
          movieRelease: review.movieRelease,
          rating: review.rating,
          reviewText: review.reviewText,
          userId: review.userId,
          userEmail: review.userEmail,
          posterPath: review.poster_path,
        });
      });
    }
  }

  onSubmit() {
    // If the form is valid and reviewId is present, update the review
    if (this.reviewForm.valid && this.reviewId) {
      this.reviewService
        .updateReview(this.reviewId, this.reviewForm.value)
        .then(() => {
          this.message = 'Review updated successfully!';
          // Navigate to the movie details page after updating the review
          this.router.navigate([
            '/movies',
            this.reviewForm?.get('movieId')?.value,
          ]);
        });
    }
  }
}
