import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private router: Router) {
    this.userLoggedIn$.next(false);
  }

  login(email: string, password: string): Observable<User> {
    let uri = `${environment.baseUrl}/api/auth/login`;
    let body = {
      email: email,
      password: password,
    };
    return this.httpClient.post<User>(uri, body).pipe(
      tap((_res) => {
        this.userLoggedIn$.next(true);
      }),
    );
  }

  register(
    email: string,
    password: string,
  ): Observable<User> {
    let uri = `${environment.baseUrl}/api/auth/register`;
    let body = {
      email: email,
      password: password,
    };

    return this.httpClient.post<User>(uri, body).pipe(
      tap((_res) => {
        console.log('User registered successfully');
        //TODO: add toast or notification for successful registration
      }),
    );
  }

  logout(): void {
    document.cookie = 'HabitTracker.Application=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.userLoggedIn$.next(false);
  }
}
