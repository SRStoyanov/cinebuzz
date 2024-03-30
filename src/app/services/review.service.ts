import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private firestore: AngularFirestore) {}

  getReviews(): Observable<any[]> {
    return this.firestore.collection('reviews').valueChanges();
  }

  getReview(id: string): Observable<any> {
    return this.firestore.collection('reviews').doc(id).valueChanges();
  }

  getReviewsForMovie(movieId: string): Observable<any[]> {
    return this.firestore
      .collection('reviews', (ref) => ref.where('movieId', '==', movieId))
      .valueChanges();
  }
}
