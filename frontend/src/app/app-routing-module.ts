import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Auth Guard
import { authGuard } from './guards/auth-guard';
// Components
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Patients } from './pages/patients/patients';
import { Records } from './pages/records/records';
import { Home } from './pages/home/home';
import { Privacy } from './pages/privacy/privacy';
import {Terms} from "./pages/terms/terms";
import {Contact} from "./pages/contact/contact";
import { Dashboard } from './pages/dashboard/dashboard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  {path : 'privacy', component: Privacy },
  {path : 'terms', component: Terms },
  {path : 'contact', component: Contact },
  {path : 'dashboard' , component : Dashboard , canActivate: [authGuard]},
  { path: 'patients', component: Patients , canActivate: [authGuard]},
  { path: 'records/:patientId', component: Records , canActivate: [authGuard] },
  {path : 'records', component: Records , canActivate: [authGuard]},
  {path : '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}