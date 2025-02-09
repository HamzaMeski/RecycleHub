import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthRequest, AuthResponse } from '@shared/types/models';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private userSubject = new BehaviorSubject<AuthResponse | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Only try to get user from storage if we're in the browser
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = this.getUserFromStorage();
      if (storedUser) {
        this.userSubject.next(storedUser);
      }
    }
  }

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (isPlatformBrowser(this.platformId)) {
            try {
              localStorage.setItem('token', response.token);
              localStorage.setItem('user', JSON.stringify(response));
              this.userSubject.next(response);
            } catch (error) {
              console.error('Error saving auth data to localStorage:', error);
            }
          }
        })
      );
  }

  registerHouseHold(request: any): Observable<any> {
    return this.http.post(`${this.API_URL}/households/register`, request);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } catch (error) {
        console.error('Error removing auth data from localStorage:', error);
      }
    }
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    try {
      return !!localStorage.getItem('token');
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  }

  private getUserFromStorage(): AuthResponse | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        return null;
      }
      
      const user = JSON.parse(userStr);
      // Validate the parsed object has the required fields
      if (user && 
          typeof user.token === 'string' &&
          typeof user.userType === 'string' &&
          typeof user.userId === 'number' &&
          typeof user.email === 'string' &&
          typeof user.firstName === 'string' &&
          typeof user.lastName === 'string') {
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      // If there's an error, clear the invalid data
      try {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } catch (e) {
        console.error('Error clearing invalid auth data:', e);
      }
      return null;
    }
  }
}
