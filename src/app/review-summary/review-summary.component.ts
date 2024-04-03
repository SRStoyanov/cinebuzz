// review-summary.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-review-summary',
  templateUrl: './review-summary.component.html',
  styleUrls: ['./review-summary.component.css'],
})
export class ReviewSummaryComponent implements OnInit {
  private _review: any;
  @Input() loggedInUserId: string | null = null;
  @Input() showPoster = true;
  userEmail$: Observable<string | null> = of(null);

  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.loggedInUserId = null; // clear the user id when the user logs out
      }
    });
  }

  @Input()
  set review(value: any) {
    this._review = value;
    if (value) {
      this.userEmail$ = of(value.userEmail);
    }
  }

  get review(): any {
    return this._review;
  }

  onEdit() {
    this.edit.emit(this._review.id);
  }

  onDelete() {
    this.delete.emit(this._review.id);
  }
}
