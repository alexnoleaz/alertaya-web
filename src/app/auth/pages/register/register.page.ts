import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { LocalStorageService } from '../../../shared/local-storage.service';

@Component({
  selector: 'app-auth-register-page',
  templateUrl: './register.page.html',
  imports: [FormsModule, RouterModule],
})
export class RegisterPage {
  name: string = '';
  surname: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';

  private readonly authService: AuthService;
  private readonly router: Router;
  private readonly localStorageService: LocalStorageService;

  constructor(
    authService: AuthService,
    router: Router,
    localStorageService: LocalStorageService
  ) {
    this.authService = authService;
    this.router = router;
    this.localStorageService = localStorageService;
  }

  register() {
    this.authService
      .register({
        name: this.name,
        email: this.email,
        password: this.password,
        phone: '00000000',
        surname: 'NA',
        roleNames: ['ADMIN'],
      })
      .subscribe({
        next: (res) => {
          this.localStorageService.set('token', res.data!.accessToken);
          this.localStorageService.set('userId', res.data!.userId.toString());
          this.router.navigate(['/inicio']);
        },
        error: (err) => {
          console.error('Error completo:', err);
          console.error('Mensaje del backend:', err.error?.message);
          alert(
            'Registro fallido: ' +
              (err.error?.message ?? 'Verifica los campos.')
          );
        },
      });
  }
}
