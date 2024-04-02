// review-summary.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-review-summary',
  templateUrl: './review-summary.component.html',
  styleUrls: ['./review-summary.component.css'],
})
export class ReviewSummaryComponent implements OnInit {
  private _review: any;
  @Input() loggedInUserId: string | null = null;
  userEmail$: Observable<string | null> = of(null);

  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  @Input()
  set review(value: any) {
    console.log('Setting review:', value);
    this._review = value;
    if (value) {
      this.userEmail$ = of(value.userEmail);
    }
  }

  get review(): any {
    return this._review;
  }

  onEdit() {
    console.log('Editing review:', this._review.id);
    this.edit.emit(this._review.id);
  }

  onDelete() {
    console.log('Deleting review:', this._review.id);
    this.delete.emit(this._review.id);
  }
}
