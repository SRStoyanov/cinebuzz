// src/app/login/login.component.ts
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

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }

  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password);
    }
  }

  register() {
    if (this.email && this.password) {
      this.authService.register(this.email, this.password);
    }
  }
}
