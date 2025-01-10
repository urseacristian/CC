import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userProfile = new BehaviorSubject<any>(this.getUserProfile());

  private hasToken(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  private getUserProfile(): any {
    if (typeof window !== 'undefined' && localStorage) {
      const profile = localStorage.getItem('user');
      return profile ? JSON.parse(profile) : null;
    }
    return null;
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get userProfile$(): Observable<any> {
    return this.userProfile.asObservable();
  }

  login(token: string, userProfile: any): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userProfile));
    }
    this.loggedIn.next(true);
    this.userProfile.next(userProfile);
  }

  logout(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.loggedIn.next(false);
    this.userProfile.next(null);
  }
}
