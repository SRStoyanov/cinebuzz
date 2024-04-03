import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  // Inject AuthService and Router in the constructor
  constructor(private authService: AuthService, private router: Router) {}

  // Method to determine if a route can be activated
  canActivate() {
    return this.authService.user$.pipe(
      map((user) => {
        if (user) return true; // Allow navigation if user is authenticated

        this.router.navigate(['/login']); // Redirect to login if user is not authenticated
        return false;
      })
    );
  }
}
