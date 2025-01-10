import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../../../service/services/backend.service';

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
            localStorage.setItem('isLogged', 'true');
            localStorage.setItem('email', email);
            this.router.navigate(['/home']);
            console.log({ email, password })
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
