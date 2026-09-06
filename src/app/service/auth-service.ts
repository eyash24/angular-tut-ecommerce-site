import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { API_BASE_URL } from '../api';
import { ApiUser, TokenResponse } from '../models/user';

const TOKEN_KEY = 'access_token';
const DEFAULT_AVATAR = 'https://images.pexels.com/photos/36746841/pexels-photo-36746841.jpeg';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private usersUrl = `${API_BASE_URL}/api/users`;

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY) ?? localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_KEY, token);
  }

  clearToken(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }

  signIn(email: string, password: string) {
    const body = new HttpParams()
      .set('username', email)
      .set('password', password);

    return this.http
      .post<TokenResponse>(`${this.usersUrl}/token`, body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(
        tap((token) => this.setToken(token.access_token)),
      );
  }

  signUp(username: string, email: string, password: string) {
    return this.http.post<ApiUser>(this.usersUrl, {
      username,
      email,
      password,
      image_url: DEFAULT_AVATAR,
    });
  }

  getMe() {
    return this.http.get<ApiUser>(`${this.usersUrl}/me`);
  }

  getPublicUser(userId: number) {
    return this.http.get<ApiUser>(`${this.usersUrl}/${userId}`);
  }
}
