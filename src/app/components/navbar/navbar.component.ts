import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
   standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  userRole: string = '';


  constructor(private router: Router, private userService: UserService) {}

ngOnInit(): void {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      this.userService.getUserById(Number(userId), token).subscribe({
        next: (res) => {
          this.userName = res.data.name;
        },
        error: () => {
          console.error('No se pudo obtener el usuario');
        }
      });
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
