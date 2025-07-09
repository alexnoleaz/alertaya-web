import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LocalStorageService } from '../shared/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  if (localStorageService.getString('token')) return true;

  return router.createUrlTree(['auth/iniciar-sesion'], {
    queryParams: { redirect: state.url },
  });
};
