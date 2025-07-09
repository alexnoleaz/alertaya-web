import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../users/user.service';
import {
  trigger,
  style,
  animate,
  transition,
  state,
} from '@angular/animations';
import { LocalStorageService } from '../../shared/local-storage.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate(
          '500ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  userRole: string = '';

  private readonly router: Router;
  private readonly userService: UserService;
  private readonly localStorageService: LocalStorageService;

  constructor(
    router: Router,
    userService: UserService,
    localStorageService: LocalStorageService
  ) {
    this.router = router;
    this.userService = userService;
    this.localStorageService = localStorageService;
  }

  ngOnInit(): void {
    const token = this.localStorageService.getString('token');
    const userId = this.localStorageService.getNumber('userId');

    if (token && userId) {
      this.userService.getUserById(Number(userId)).subscribe({
        next: (res) => {
          this.userName = res.data!.name;
        },
        error: () => {
          console.error('No se pudo obtener el usuario');
        },
      });
    }
  }

  logout(): void {
    this.localStorageService.clear();
    this.router.navigate(['auth/iniciar-sesion']);
  }
}
