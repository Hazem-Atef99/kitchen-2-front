import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _AuthService = inject(AuthService);
  const _Router = inject(Router);
  const token = _AuthService.getToken() as string;
  if(token){
    return true
  }
  _Router.navigateByUrl('/login');
  return false
};
