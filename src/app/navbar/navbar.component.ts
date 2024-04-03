import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MovieDbService } from '../services/movie-db.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LucideAngularModule, Popcorn } from 'lucide-angular';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user$: Observable<any>;
  searchForm: FormGroup;
  searchResults: Movie[] = [];
  menuOpen = false; // Add this line

  constructor(
    private authService: AuthService,
    private movieDbService: MovieDbService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.user$ = this.authService.user$;
    this.searchForm = this.formBuilder.group({
      movieSearch: '',
    });
  }

  ngOnInit(): void {
    this.searchForm
      .get('movieSearch')
      ?.valueChanges.pipe(
        debounceTime(300),
        switchMap((movieName) =>
          movieName ? this.movieDbService.searchMovie(movieName) : []
        )
      )
      .subscribe((response: any) => {
        this.searchResults = response.results.slice(0, 10);
      });
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value;

    if (searchValue) {
      this.movieDbService
        .searchMovie(searchValue)
        .subscribe((response: any) => {
          this.searchResults = response.results.slice(0, 10);
        });
    } else {
      this.searchResults = [];
    }
  }

  onMovieSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedMovieId = target.value;

    if (selectedMovieId) {
      this.router.navigate(['/movies', selectedMovieId]);
      this.searchForm.reset();
      this.searchResults = [];
    }
  }

  getProfileLink(user: any): string {
    return user && user.uid ? `/users/${user.uid}` : '/'; // Return the user profile link if uid is available, otherwise return home link
  }

  logout() {
    this.authService.logout();
  }
}
