import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieDbService {
  private readonly API_KEY = 'ee014ea97fa9dfbafaf85ff13bc82bb7';
  private readonly BASE_URL = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  searchMovie(movieName: string): Observable<any> {
    const url = `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&query=${movieName}`;
    return this.http.get(url);
  }
}
