import { Injectable, inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { AuthResponse, LoginRequest, RegisterRequest } from "../models/auth.models";
import { tap } from "rxjs/operators";
import { Observable, of } from "rxjs";

const TOKEN_KEY = "app.jwt";

@Injectable({ providedIn: "root" })
export class AuthService {
  private http = inject(HttpClient);
  private base = `${environment.apiBaseUrl}/api/auth`;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/login`, data)
      .pipe(tap(res => this.setToken(res.accessToken)));
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/register`, data)
      .pipe(tap(res => this.setToken(res.accessToken)));
  }

  setToken(token: string) { if (this.isBrowser) localStorage.setItem(TOKEN_KEY, token); }
  getToken(): string | null { return this.isBrowser ? localStorage.getItem(TOKEN_KEY) : null; }
  isAuthenticated(): Observable<boolean> { return of(!!this.getToken()); }
  logout() { if (this.isBrowser) localStorage.removeItem(TOKEN_KEY); }
}
