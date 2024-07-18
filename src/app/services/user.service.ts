import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ClientsService } from './clients.service';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _username: string = '';
  private baseUrl: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient, private clientsService: ClientsService) {}

  login(username: string, password: string): Observable<any> {
    if (username === 'useradmin' && password === 'passadmin') {
      return this.http.get<Client[]>(this.baseUrl).pipe(
        tap(clients => {
          localStorage.setItem('clients', JSON.stringify(clients));
        }),
        switchMap(() => {
          const fakeResponse = { success: true, token: 'fake-jwt-token', username: 'useradmin' };
          return of(fakeResponse).pipe(
            tap(response => {
              if (response.success) {
                localStorage.setItem('user', JSON.stringify(response));
                this._username = response.username;
              }
            })
          );
        })
      );
    } else {
      return of({ success: false });
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('clients');
    this._username = '';
  }

  getUsername(): string {
    if (!this._username && localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user')!);
      this._username = user.username;
    }
    return this._username;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
