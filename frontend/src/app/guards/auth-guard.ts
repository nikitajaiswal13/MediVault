import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

function isTokenvalid(token : string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload.exp;
  const currentTime = Math.floor(Date.now() / 1000);
  return exp > currentTime;
}

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (token && isTokenvalid(token)) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};