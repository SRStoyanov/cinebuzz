// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  login(email: string, password: string): Promise<any> {
    // Define return type as Promise<any>
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string): Promise<any> {
    // Define return type as Promise<any>
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    // Define return type as Promise<void>
    return this.auth.signOut();
  }
}
