import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from '../signup/signup';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {


   constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {

  }
  
openSignup() {
  this.dialog.open(Signup, {
    width: '420px'
  });
}
}
