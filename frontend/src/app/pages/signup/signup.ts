import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Login } from '../login/login';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  signupForm: FormGroup;
  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;

  private baseUrl = 'https://medivault-dhav.onrender.com/api/v1/users';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {

    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {

    const password = form.get('password');
    const confirmPassword = form.get('passwordConfirm');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {

      confirmPassword.setErrors({ passwordMismatch: true });

    } else {

      if (confirmPassword.hasError('passwordMismatch')) {

        confirmPassword.setErrors(null);

      }
    }

    return null;
  }



  onSubmit() {

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.http.post(`${this.baseUrl}/signup`, this.signupForm.value)
      .subscribe({
        next: (res: any) => {

          this.isLoading = false;

          localStorage.setItem('token', res.token);

          this.snackBar.open(
            'Account created successfully!',
            'Close',
            {
              duration: 3000
            }
          );

          this.dialog.closeAll();

          this.router.navigate(['/dashboard']);
        },
        error: (err) => {

          console.log(err);

          this.isLoading = false;

          let errorMessage = 'Signup failed. Try again.';

          if (err.status === 409) {
            errorMessage = 'Email already exists';
          }

          else if (err.error?.message) {
            errorMessage = err.error.message;
          }

          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000
          });

        }
      });
  }

  openLogin() {
    this.dialog.closeAll();
    this.dialog.open(Login, {
      width: '420px'
    });
  }
}