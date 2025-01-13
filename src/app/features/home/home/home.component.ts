import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  email: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = localStorage.getItem('isLogged') === 'true';
      this.email = localStorage.getItem('email');
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isLogged');
      localStorage.removeItem('email');
    }
    this.isLoggedIn = false;
    this.email = null;
    this.router.navigate(['/login']);
  }
}
