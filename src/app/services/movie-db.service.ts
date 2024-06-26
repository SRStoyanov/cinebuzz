import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieDbService {
  // API key and base URL for the movie database
  private readonly API_KEY = 'ee014ea97fa9dfbafaf85ff13bc82bb7';
  private readonly BASE_URL = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Method to search for a movie by name
  searchMovie(movieName: string): Observable<any> {
    const url = `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&query=${movieName}`;
    return this.http.get(url);
  }

  // Method to get the poster of a movie by its ID
  getMoviePoster(movieId: number): Observable<any> {
    const url = `${this.BASE_URL}/movie/${movieId}?api_key=${this.API_KEY}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.poster_path
          ? `https://image.tmdb.org/t/p/w500${response.poster_path}`
          : null;
      })
    );
  }

  // Method to get the details of a movie by its ID
  getMovieDetails(movieId: number): Observable<any> {
    const url = `${this.BASE_URL}/movie/${movieId}?api_key=${this.API_KEY}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return {
          title: response.title,
          releaseYear: response.release_date.split('-')[0], // Extract the release year from the release date
          synopsis: response.overview,
          posterPath: response.poster_path
            ? `https://image.tmdb.org/t/p/w500${response.poster_path}`
            : null,
        };
      })
    );
  }
}
