// src/app/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Import your AuthService
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user$: Observable<any>; // This will hold the user data observable

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$; // Get the user data observable from the AuthService
  }

  ngOnInit(): void {
    // This method is required by the OnInit interface.
    // Add any initialization logic you need here.
  }

  getProfileLink(user: any): string {
    return user && user.uid ? `/users/${user.uid}` : '/'; // Return the user profile link if uid is available, otherwise return home link
  }

  logout() {
    this.authService.logout();
  }
}
