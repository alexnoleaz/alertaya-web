import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // Validación básica (solo para prueba de navegación)
    if (this.username === 'admin' && this.password === '1234') {
      this.router.navigate(['/inicio']); // redirige al inicio
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
