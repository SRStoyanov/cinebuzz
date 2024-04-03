import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null; // Holds the user id from the route
  loggedInUserId: string | null = null; // Holds the id of the currently logged-in user

  // Inject ActivatedRoute and AuthService in the constructor
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    // Get the user id from the route parameters
    this.userId = this.route.snapshot.paramMap.get('uid');

    // Get the id of the currently logged-in user
    this.loggedInUserId = await this.authService.getUserId();
  }
}
