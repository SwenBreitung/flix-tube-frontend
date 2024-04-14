import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  openSidebar = true;
  isRegisterPage = true;
  constructor() { }

  
  toggleMenu() {
    this.openSidebar = !this.openSidebar; // Umschalten des Zustands
  }
}
