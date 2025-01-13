import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../../service/services/backend.service'; 

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  email: string | null = null;
  loginError: string | null = null;

  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = false;
    this.email = null;
  }

  login(email: string, password: string): void {
    this.backendService.loginUser({ email, password }).subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          this.isLoggedIn = true;
          this.email = email;
          this.loginError = null;
        } else {
          this.isLoggedIn = false;
          this.loginError = 'Autentificare eșuată. Verificați datele introduse.';
        }
      },
      error: (err) => {
        this.isLoggedIn = false;
        this.loginError = 'Eroare la conectare. Încercați din nou mai târziu.';
        console.error('Eroare:', err);
      },
    });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.email = null;
    this.router.navigate(['/login']);
  }
}
