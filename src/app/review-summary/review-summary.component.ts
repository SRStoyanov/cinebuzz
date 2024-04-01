import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-review-summary',
  templateUrl: './review-summary.component.html',
  styleUrls: ['./review-summary.component.css'],
})
export class ReviewSummaryComponent implements OnInit {
  private _review: any;
  userEmail$: Observable<string | null> = of(null); // Change this line

  constructor() {}

  ngOnInit(): void {}

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
}
