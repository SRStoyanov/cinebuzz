import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  template: `
    <input [(ngModel)]="email" placeholder="Email" />
    <input [(ngModel)]="password" placeholder="Password" type="password" />
    <button (click)="login()">Sign in with Email</button>
    <button (click)="register()">Register</button>
    <button (click)="logout()">Sign out</button>
    <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
    <p *ngIf="successMessage" class="success">{{ successMessage }}</p>
  `,
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) {}

  login() {
    if (this.email && this.password) {
      this.authService
        .login(this.email, this.password)
        .then(() => {
          this.successMessage = 'Successfully signed in!';
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
        this.errorMessage = '';
      })
      .catch((error: any) => {
        this.errorMessage = 'Sign out failed';
        this.successMessage = '';
      });
  }
}
