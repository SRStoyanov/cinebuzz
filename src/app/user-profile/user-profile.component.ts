// src/app/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  reviews: any[] = [];
  userId!: string;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('uid')!;
    this.reviewService.getReviewsByUser(this.userId).subscribe((reviews) => {
      this.reviews = reviews;
    });
  }
}
