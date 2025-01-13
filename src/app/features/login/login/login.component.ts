import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../../../service/services/backend.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.backendService.loginUser({ email, password }).subscribe({
        next: (response) => {
          if (response) {
            this.router.navigate(['/home'], {
              state: { email },
            });
            this.loginError = null;
          } else {
            this.loginError = 'Invalid credentials';
          }
        },
        error: (err) => {
          console.error(err);
          this.loginError = 'Login failed. Please try again later.';
        },
      });
    }
  }
}
