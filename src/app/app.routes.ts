import { Routes } from '@angular/router';

import { LoginPage } from './auth/pages/login/login.page';
import { RegisterPage } from './auth/pages/register/register.page';
import { HomePage } from './home/home.page';
import { LandingPage } from './landing/landing.page';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'auth/iniciar-sesion', component: LoginPage },
  { path: 'auth/registrarse', component: RegisterPage },
  { path: 'inicio', component: HomePage, canActivate: [authGuard] },
];
