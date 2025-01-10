import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../../../service/services/backend.service';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.backendService.loginUser(this.loginForm.value).subscribe({
        next: (response: any) => {
          if (response && response.token) {
            const profile = { email: this.loginForm.value.email, ...response.user };
            this.authService.login(response.token, profile);
            this.router.navigate(['/home']);
          } else {
            alert('Invalid credentials');
          }
        },
        error: (err) => {
          console.error(err);
          alert('Login failed');
        },
      });
    }
  }
}
