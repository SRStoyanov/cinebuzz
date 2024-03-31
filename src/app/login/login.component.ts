// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user$: Observable<any>; // This will hold the user data observable
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$; // Get the user data observable from the AuthService
  }

  login() {
    if (this.email && this.password) {
      this.authService
        .login(this.email, this.password)
        .then(() => {
          this.successMessage = 'Successfully signed in!';
          setTimeout(() => (this.successMessage = ''), 3000);
          this.errorMessage = '';
        })
        .catch((error: any) => {
          this.errorMessage = error.message;
          this.successMessage = '';
        });
    } else {
      this.errorMessage = 'Please enter an email and password.';
      this.successMessage = '';
    }
  }

  register() {
    if (this.email && this.password) {
      this.authService
        .register(this.email, this.password)
        .then(() => {
          this.successMessage = 'Successfully registered!';
          setTimeout(() => (this.successMessage = ''), 3000);
          this.errorMessage = '';
        })
        .catch((error: any) => {
          this.errorMessage = error.message;
          this.successMessage = '';
        });
    } else {
      this.errorMessage = 'Please enter an email and password.';
      this.successMessage = '';
    }
  }

  logout() {
    this.authService
      .logout()
      .then(() => {
        this.successMessage = 'Successfully signed out!';
        setTimeout(() => (this.successMessage = ''), 3000);
        this.errorMessage = '';
      })
      .catch((error: any) => {
        this.errorMessage = 'Sign out failed';
        this.successMessage = '';
      });
  }
}
