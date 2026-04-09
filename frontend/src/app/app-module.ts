import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Angular Router
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Patients } from './pages/patients/patients';
import { Records } from './pages/records/records';
import { Navbar } from './components/navbar/navbar';
import { Home } from './pages/home/home';
import { Footer } from './components/footer/footer';
import { Terms } from './pages/terms/terms';
import { Privacy } from './pages/privacy/privacy';
import {Contact} from './pages/contact/contact'

// Angular Forms and HTTP Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AddRecordDialog } from './components/add-record-dialog/add-record-dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Dashboard } from './pages/dashboard/dashboard';
import { ConfirmDialog } from './shared/confirm-dialog/confirm-dialog';

@NgModule({
  declarations: [
    App,
    Login,
    Signup,
    Patients,
    Records,
    Navbar,
    Home,
    Footer,
    Patients,
    AddRecordDialog,
    Terms,
    Privacy,
    Contact,
    Dashboard,
    ConfirmDialog,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
