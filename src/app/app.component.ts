import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, Event } from '@angular/router'; // Import NavigationStart and Event
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Your App Title'; // Declare a title property
  showComponents = true; // Declare a showComponents property

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
          !navigationEndEvent.urlAfterRedirects.startsWith('/movies/');
      });
  }
}
