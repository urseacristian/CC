import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../../../service/services/backend.service';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.isSubmitting = true;
      const { email, password } = this.signUpForm.value;

      this.backendService.signUpUser({ email, password }).subscribe({
        next: (response) => {
          if (response) {
            alert('Cont creat cu succes!');
            this.router.navigate(['/login']);
          } else {
            alert('Înregistrarea a eșuat. Încearcă din nou.');
          }
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error(err);
          alert('A apărut o eroare la înregistrare.');
          this.isSubmitting = false;
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
