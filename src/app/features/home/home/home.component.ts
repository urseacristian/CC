import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  email: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLogged') === 'true';
    this.email = localStorage.getItem('email');
  }

  logout(): void {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('email');
    this.isLoggedIn = false;
    this.email = null;
    this.router.navigate(['/login']);
  }
}
