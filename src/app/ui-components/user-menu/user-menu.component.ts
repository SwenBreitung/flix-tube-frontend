import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from './../../service/layout.service';
import { AuthService } from './../../service/auth.service'

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})

export class UserMenuComponent {
  constructor(
    public authService: AuthService,
    public layoutService: LayoutService,
    public router: Router,
  ) { }

  loadStartPage() {
    this.router.navigate(['main/start-page']);
    this.layoutService.toggleUserMenu();
  }

  loadUploadFile() {
    this.router.navigate(['main/upload']);
    this.layoutService.toggleUserMenu();
  }

  logout() {
    this.layoutService.toggleUserMenu();
    this.authService.logout()
  }
}
