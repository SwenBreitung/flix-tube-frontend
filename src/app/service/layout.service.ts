import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  isRegisterPage = true;
  openSidebar = false;
  isUserMenuOpen =false;

  constructor() {}

  toggleMenu() {
    this.openSidebar = !this.openSidebar; 
  }

  toggleUserMenu(){
    this.isUserMenuOpen = !this.isUserMenuOpen; 
  }
}
