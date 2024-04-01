import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  getReviews(query?: { movieId?: string; userId?: string }): Observable<any[]> {
    return this.firestore
      .collection('reviews', (ref) => {
        let queryRef: firebase.firestore.Query = ref;
        if (query) {
          if (query.movieId) {
            queryRef = queryRef.where('movieId', '==', query.movieId);
          }
          if (query.userId) {
            queryRef = queryRef.where('userId', '==', query.userId);
          }
        }
        return queryRef;
      })
      .valueChanges();
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
    userEmail?: string; // Add this line
  }): Promise<any> {
    return this.authService.user$
      .pipe(
        take(1),
        switchMap((user) => {
          if (user) {
            // If the user is logged in, include their email in the review
            review.userEmail = user.email;
            return from(this.firestore.collection('reviews').add(review));
          } else {
            // If the user is not logged in, throw an error
            throw new Error('User not logged in');
          }
        })
      )
      .toPromise();
  }
}
