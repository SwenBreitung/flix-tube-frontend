import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent,ContentComponent,RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(
    private authService:AuthService,
    private router: Router
  ){
    this.authService.checkAuth();
  }
 
 



}
