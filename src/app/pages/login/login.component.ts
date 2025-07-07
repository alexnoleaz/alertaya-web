import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.authService
      .login({
        email: this.username,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          const token = res.data.accessToken;
          const userId = res.data.userId;
          localStorage.setItem('token', res.data.accessToken);
          localStorage.setItem('userId', res.data.userId.toString());
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
