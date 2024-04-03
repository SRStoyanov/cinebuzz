import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Observable to hold the user data
  user$: Observable<any>;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    // Set user$ to the current auth state
    this.user$ = this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return of(user);
        } else {
          return of(null);
        }
      })
    );
  }

  // Getter to check if the user is logged in
  get isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return of(true);
        } else {
          return of(false);
        }
      })
    );
  }

  // Method to log in a user
  async login(email: string, password: string) {
    const credential = await this.auth.signInWithEmailAndPassword(
      email,
      password
    );
    this.router.navigate(['/']);
    return credential;
  }

  // Method to log out a user
  async logout() {
    await this.auth.signOut();
    this.router.navigate(['/']);
  }

  // Method to register a user
  async register(email: string, password: string) {
    const credential = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    this.router.navigate(['/']);
    return credential;
  }

  // Method to get the current user's ID
  getUserId(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null);
        }
      }, reject);
    });
  }
}
