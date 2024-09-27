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


  /**
 * Navigates the user to the start page and toggles the user menu.
 * This method is typically used to redirect to the main start page and manage the user menu state.
 */
  loadStartPage() {
    this.router.navigate(['main/start-page']);
    this.layoutService.toggleUserMenu();
  }


  /**
 * Navigates the user to the upload page and toggles the user menu.
 * This method is used to redirect to the upload page and manage the user menu state.
 */
  loadUploadFile() {
    this.router.navigate(['main/upload']);
    this.layoutService.toggleUserMenu();
  }


  /**
 * Logs the user out and toggles the user menu.
 * This method toggles the user menu's visibility and calls the `logout` function
 * from the authentication service to log the user out.
 */
  logout() {
    this.layoutService.toggleUserMenu();
    this.authService.logout()
  }
}
