import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);  

  if (token) {
    return true;
  } else {
    console.error('Acceso denegado: No se encontró el token de autenticación.');
    router.navigate(['']);  
    return false;
  }
};
