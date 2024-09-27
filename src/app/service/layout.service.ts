import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  isRegisterPage = true;
  openSidebar = false;
  isUserMenuOpen =false;

  constructor() {}


  /**
 * Toggles the state of the sidebar menu by inverting the `openSidebar` boolean.
 * If the sidebar is open, it will close, and if it is closed, it will open.
 */
  toggleMenu() {
    this.openSidebar = !this.openSidebar; 
  }


  /**
 * Toggles the state of the user menu by inverting the `isUserMenuOpen` boolean.
 * If the user menu is open, it will close, and if it is closed, it will open.
 */
  toggleUserMenu(){
    this.isUserMenuOpen = !this.isUserMenuOpen; 
  }
}
