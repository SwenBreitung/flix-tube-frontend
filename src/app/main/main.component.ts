import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserMenuComponent } from "../ui-components/user-menu/user-menu.component";
import { CommonModule } from '@angular/common';
import { BackendService } from './../service/backend.service'
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, ContentComponent, RouterModule, UserMenuComponent,CommonModule,],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(
    public backendService : BackendService,
    private authService:AuthService,
    private router: Router
  ){
    this.authService.checkAuth();
  }
}
