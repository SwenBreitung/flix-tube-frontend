import { Component } from '@angular/core';
import { BackendService } from './../../service/backend.service'
@Component({
  selector: 'app-user-img',
  standalone: true,
  imports: [],
  templateUrl: './user-img.component.html',
  styleUrl: './user-img.component.scss'
})
export class UserImgComponent {
  
  constructor(
    public backendService: BackendService,
  ) {}





}
