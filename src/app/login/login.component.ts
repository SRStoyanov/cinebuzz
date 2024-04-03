import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user$: Observable<any>;
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  // Inject AuthService in the constructor
  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }

  // Method to handle user login
  login() {
    this.errorMessage = '';
    this.successMessage = '';

    // Check if email and password are provided
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    // Validate password length
    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      return;
    }

    // Call AuthService to login
    this.authService.login(this.email, this.password).catch((error) => {
      this.errorMessage =
        'Failed to login. Please check your email and password.';
    });
  }

  // Method to handle user registration
  register() {
    this.errorMessage = '';
    this.successMessage = '';

    // Check if email and password are provided
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    // Validate password length
    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      return;
    }

    // Call AuthService to register
    this.authService.register(this.email, this.password).catch((error) => {
      // Handle specific error for email already in use
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage =
          'This email is already associated with an existing account.';
      } else {
        this.errorMessage = 'Failed to register. Please check your input.';
      }
    });
  }
}
