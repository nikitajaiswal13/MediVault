import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './guards/auth-guard';

import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Patients } from './pages/patients/patients';
import { Records } from './pages/records/records';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'patients', component: Patients , canActivate: [authGuard]},
  { path: 'records/:patientId', component: Records , canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}