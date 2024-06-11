import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './../../service/auth.service'
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {

  constructor(
    private authService:AuthService
  ){
    this.authService.checkAuth();
  }
 
}
