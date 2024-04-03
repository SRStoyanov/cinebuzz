import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;
  loggedInUserId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userId = this.route.snapshot.paramMap.get('uid');
    this.loggedInUserId = await this.authService.getUserId();
  }
}
