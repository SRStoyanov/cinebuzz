// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>; // This will hold the user data

  constructor(private auth: AngularFireAuth) {
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

  login(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }
}
