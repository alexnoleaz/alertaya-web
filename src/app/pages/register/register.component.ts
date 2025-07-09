import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports:[FormsModule, RouterModule]
})
export class RegisterComponent {
  name: string = '';
  surname: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register({
    name: this.name,
    email: this.email,
    password: this.password,
    phone: '00000000',
    surname:'NA',
    roleNames: ['ADMIN']
  }).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.data.accessToken);
      localStorage.setItem('userId', res.data.userId.toString());
      this.router.navigate(['/inicio']);
    },
    error: (err) => {
      console.error('Error completo:', err);
  console.error('Mensaje del backend:', err.error?.message);
  alert('Registro fallido: ' + (err.error?.message ?? 'Verifica los campos.'));
}
  });
}
}
