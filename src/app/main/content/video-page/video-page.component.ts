import { Component } from '@angular/core';
import { BackendService } from './../../../service/backend.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-page',
  standalone: true,
  imports: [],
  templateUrl: './video-page.component.html',
  styleUrl: './video-page.component.scss'
})
export class VideoPageComponent {
constructor(
  public backendService: BackendService,
  public router: Router,
){}


  ngOnInit(): void {
    
    console.log('Komponente initialisiert',this.backendService.videoID);
    console.log('Komponente initialisiert',this.backendService.baseURL + this.backendService.videoID);
  }

}
