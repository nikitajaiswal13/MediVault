import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Login } from '../../pages/login/login';
import { Signup } from '../../pages/signup/signup';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }


  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  openLogin() {
    this.dialog.open(Login, {
      width: '400px'
    });
  }


  openSignup() {
    this.dialog.open(Signup, {
      width: '420px'
    });
  }


  logout(): void {

  const dialogRef = this.dialog.open(ConfirmDialog, {
    width: '350px',
    data: {
      title: 'Confirm Logout',
      message: 'Are you sure you want to log out?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {

    if (result) {
      localStorage.removeItem('token');

      this.router.navigate(['/home']);
    }

  });
}
}