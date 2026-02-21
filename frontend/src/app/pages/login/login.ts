import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Signup } from '../signup/signup';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm: FormGroup;
  isLoading = false;

  private baseUrl = 'http://localhost:3000/api/v1/users';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.http.post(`${this.baseUrl}/login`, this.loginForm.value)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);

          this.isLoading = false;     // stop spinner
          this.dialog.closeAll();     // close popup
          this.router.navigate(['/patients']);
        },
        error: () => {
          this.snackBar.open('Invalid email or password', 'Close', {
            duration: 3000
          });

          this.isLoading = false;
        }
      });
  }

    openSignup() {
    this.dialog.closeAll();
    this.dialog.open(Signup, {
      width: '420px'
    });
  }
}