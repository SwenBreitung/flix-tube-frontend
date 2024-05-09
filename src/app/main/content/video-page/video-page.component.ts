import { Component, ViewChild } from '@angular/core';
import { BackendService } from './../../../service/backend.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { VgCoreModule, VgApiService } from '@videogular/ngx-videogular/core';
import { VideoContent } from './../../../models/video-content.class'
import { CommonModule } from '@angular/common';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { UserImgComponent } from "../../../ui-components/user-img/user-img.component";
import { MatIconModule } from '@angular/material/icon';
import { SecondaryButtonComponent } from "../../../ui-components/secondary-button/secondary-button.component";
import { SharedButtonComponent } from "../../../ui-components/shared-button/shared-button.component";
@Component({
    selector: 'app-video-page',
    standalone: true,
    templateUrl: './video-page.component.html',
    styleUrl: './video-page.component.scss',
    imports: [
        CommonModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        UserImgComponent,
        MatIconModule,
        SecondaryButtonComponent,
        SharedButtonComponent
    ]
})

export class VideoPageComponent  {
  videoContent = new VideoContent;
  id: string | null = '';
  videoUrl: string | null = '';
  currentTime: number = 0;
  totalTime: number = 0;
  // @ViewChild('videoPlayer') videoPlayer: any;
  intervalId: any;

  preload: string = 'auto';

  media: any = '';
  api?: VgApiService;

    constructor(
      public route: ActivatedRoute,
      public backendService: BackendService,
      private apis: VgApiService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        console.log(this.id)
        if(this.id){
          this.videoUrl = this.backendService.getVideoUrl(this.id);
          this.backendService.fetchVideoUrl(this.id).then((content: any) => {
            console.log('content',content,)

            console.log('content',content,)
            this.videoContent.username = content.username;
            this.videoContent.id = content.id;
            this.videoContent.videoFile = content.video;
            this.videoContent.title = content.title;
            this.videoContent.description = content.description;
            this.videoContent.created_at = content.created_at;
            this.videoContent.video_imgs = content.video_imgs;
            console.log('videofile', this.videoContent.videoFile)
            console.log('video', this.videoContent);
            this.media = { src: this.videoContent.videoFile, type: 'video/mp4' };
          }).catch(error => {
            console.error('Error fetching video content:', error);
          });
  
      }
    }


  // updateTime() {  
    
  //   this.currentTime = this.videoPlayer.nativeElement.currentTime;
  //   console.log(this.videoPlayer.nativeElement.currentTime);
  //   this.totalTime = this.videoPlayer.nativeElement.duration;
  //   console.log(this.videoPlayer.nativeElement.duration);
  // }


  // playVideo() {
  //   this.videoPlayer.nativeElement.play();
  //   this.intervalId = setInterval(() => {
  //     this.updateTime();
  //   }, 500); 
  
  //   this.videoPlayer.nativeElement.addEventListener('ended', () => {
  //     clearInterval(this.intervalId);
  //   });

  // }

  // pauseVideo() {
  //   this.videoPlayer.nativeElement.pause();
  // }


  onPlayerReady(api: VgApiService) {
    this.api = api;
    // this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(() => {
    //   this.autoplay();
    // });
}

  autoplay() {
    console.log("Autoplaying video");
    this.api?.play();
  }

  sharedLink(url:string | null){
    if (navigator.clipboard) {
      // Verwenden der Clipboard API zum Kopieren der URL
      if (!url) {
        alert('Kein Link zum Teilen vorhanden.');
        return; // Frühzeitige Rückkehr, wenn URL null ist
      }
      // Verwende die Clipboard API wie zuvor beschrieben
      navigator.clipboard.writeText(url)
        .then(() => {
          console.log('Link kopiert:', url);
        })
        .catch(err => {
          console.error('Fehler beim Kopieren des Links:', err);
          alert('Fehler beim Kopieren des Links.');
        });
  }
}
}
  // ngOnInit(): void {
    
  //   console.log('Komponente initialisiert',this.backendService.videoID);
  //   console.log('Komponente initialisiert',this.backendService.baseURL + this.backendService.videoID);
  // }


