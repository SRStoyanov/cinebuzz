// src/app/app.component.ts
import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Cinebuzz';
  showComponents = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        const navigationEndEvent = event as NavigationEnd;
        this.showComponents =
          !navigationEndEvent.urlAfterRedirects.startsWith('/reviews/') &&
          !navigationEndEvent.urlAfterRedirects.startsWith('/movies/') &&
          !navigationEndEvent.urlAfterRedirects.startsWith('/users/');
      });
  }
}
