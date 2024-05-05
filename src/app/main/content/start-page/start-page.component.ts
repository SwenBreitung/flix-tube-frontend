
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importiere CommonModule
import { BackendService } from './../../../service/backend.service'
import { Router,RouterModule  } from '@angular/router';
@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {

  constructor(
    public backendService: BackendService,
    public router: Router,
  ) { }


  ngOnInit(): void {
    this.backendService.loadeContentData()
    console.log('Komponente initialisiert',this.backendService.videoID);
  }

  loadVideo(id:string){
    this.router.navigate(['video', id]);
    // this.router.navigate(['main/video-page']);
  }

  
}
