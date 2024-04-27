import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  isRegisterPage = true;
  openSidebar = true;
  constructor() { }
  toggleMenu() {
     this.openSidebar = !this.openSidebar; // Umschalten des Zustands
  }
}
