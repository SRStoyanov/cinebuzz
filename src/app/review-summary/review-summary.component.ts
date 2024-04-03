import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

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

  // Inject AuthService in the constructor
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Clear the user id when the user logs out
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.loggedInUserId = null;
      }
    });
  }

  // Setter for review input
  @Input()
  set review(value: any) {
    this._review = value;
    if (value) {
      this.userEmail$ = of(value.userEmail);
    }
  }

  // Getter for review input
  get review(): any {
    return this._review;
  }

  // Emit edit event with review id
  onEdit() {
    this.edit.emit(this._review.id);
  }

  // Emit delete event with review id
  onDelete() {
    this.delete.emit(this._review.id);
  }
}
