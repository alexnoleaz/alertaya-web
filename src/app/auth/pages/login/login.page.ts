import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { LocalStorageService } from '../../../shared/local-storage.service';

@Component({
  selector: 'app-auth-login-page',
  templateUrl: './login.page.html',
  imports: [FormsModule, RouterLink],
})
export class LoginPage {
  username: string = '';
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

  login() {
    this.authService
      .login({
        email: this.username,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          this.localStorageService.set('token', res.data!.accessToken);
          this.localStorageService.set('userId', res.data!.userId.toString());
          this.router.navigate(['/inicio']).then(() => {
            window.location.reload();
          });
        },
        error: () => {
          alert('Usuario o contraseña incorrectos');
        },
      });
  }
}
