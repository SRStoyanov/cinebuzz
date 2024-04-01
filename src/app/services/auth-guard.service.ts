import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // src/app/auth-guard.service.ts
  // src/app/auth-guard.service.ts
  canActivate() {
    return this.authService.user$.pipe(
      map((user) => {
        if (user) return true;

        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
