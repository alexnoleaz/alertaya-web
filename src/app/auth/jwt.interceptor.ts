import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { LocalStorageService } from '../shared/local-storage.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  const token = localStorageService.getString('token');
  const isAuthRoute =
    req.url.includes('auth/iniciar-sesion') ||
    req.url.includes('auth/registrarse');

  if (token && !isAuthRoute)
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if ((err.status === 401 || err.status === 403) && !isAuthRoute) {
        localStorageService.remove('token');
        router.navigate(['/auth/iniciar-sesion']);
      }

      return throwError(() => err);
    })
  );
};
