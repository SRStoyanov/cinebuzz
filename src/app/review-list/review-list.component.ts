import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
export class ReviewListComponent implements OnInit {
  @Input() query: any;
  @Input() limit: number = 0;
  @Input() showPoster = true;
  reviews$: Observable<any[]> = of([]);
  loggedInUserId: string | null = null;

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.reviews$ = this.reviewService.getReviews(this.query, this.limit);
    this.loggedInUserId = await this.authService.getUserId(); // Get the logged-in user's ID
  }

  onEdit(reviewId: string) {
    this.router.navigate(['/write-review', { id: reviewId }]);
  }

  onDelete(reviewId: string) {
    this.reviewService.deleteReview(reviewId).then(() => {
      // Refresh the reviews after deletion
      this.reviews$ = this.reviewService.getReviews(this.query, this.limit);
    });
  }
}
