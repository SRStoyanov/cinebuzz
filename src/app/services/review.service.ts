import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  // Inject Firestore and AuthService in the constructor
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  // Method to get reviews with optional query and limit
  getReviews(
    query?: { movieId?: string; userId?: string },
    limit?: number
  ): Observable<any[]> {
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
        if (limit) {
          queryRef = queryRef.limit(limit);
        }
        return queryRef;
      })
      .snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<any>[]) =>
          actions.map((a: DocumentChangeAction<any>) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  // Method to get a review by its ID
  getReview(id: string): Observable<any> {
    return this.firestore.collection('reviews').doc(id).valueChanges();
  }

  // Method to create a review
  createReview(review: {
    movieId: string;
    movieRelease: string;
    movieTitle: string;
    rating: number;
    reviewText: string;
    userId: string;
    userEmail?: string;
  }): Promise<any> {
    return this.authService.user$
      .pipe(
        take(1),
        switchMap((user) => {
          if (user) {
            review.userEmail = user.email;
            return from(this.firestore.collection('reviews').add(review));
          } else {
            throw new Error('User not logged in');
          }
        })
      )
      .toPromise();
  }

  // Method to delete a review by its ID
  deleteReview(reviewId: string): Promise<void> {
    return this.firestore.collection('reviews').doc(reviewId).delete();
  }

  // Method to update a review by its ID
  updateReview(
    reviewId: string,
    review: {
      movieId: string;
      movieRelease: string;
      movieTitle: string;
      rating: number;
      reviewText: string;
      userId: string;
      userEmail?: string;
    }
  ): Promise<void> {
    return this.firestore.collection('reviews').doc(reviewId).update(review);
  }
}
