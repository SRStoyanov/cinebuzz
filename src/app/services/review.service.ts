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

  getReviewsByUser(userId: string): Observable<any[]> {
    return this.firestore
      .collection('reviews', (ref) => ref.where('userId', '==', userId))
      .valueChanges();
  }

  createReview(review: {
    movieId: string;
    movieRelease: string;
    movieTitle: string;
    rating: number;
    reviewText: string;
    userId: string;
  }): Promise<any> {
    return this.firestore.collection('reviews').add(review);
  }
}
