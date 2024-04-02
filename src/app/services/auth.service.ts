import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router'; // Import Router

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>; // This will hold the user data

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router // Inject Router
  ) {
    this.user$ = this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          // If the user is logged in, return the user data
          return of(user);
        } else {
          // If the user is not logged in, return null
          return of(null);
        }
      })
    );
  }

  get isLoggedIn(): Observable<boolean> {
    // This will return true if the user is logged in
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

  async login(email: string, password: string) {
    const credential = await this.auth.signInWithEmailAndPassword(
      email,
      password
    );
    this.router.navigate(['/']); // Navigate to the homepage
    return credential;
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigate(['/']); // Navigate to the homepage
  }

  async register(email: string, password: string) {
    const credential = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    this.router.navigate(['/']); // Navigate to the homepage
    return credential;
  }

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
