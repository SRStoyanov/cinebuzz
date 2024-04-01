import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
export class ReviewListComponent implements OnInit {
  @Input() query: any;
  reviews$: Observable<any[]> = of([]);

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviews$ = this.reviewService.getReviews(this.query);
  }
}
