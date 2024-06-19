import { Component, ViewChild } from '@angular/core';
import { BackendService } from './../../../service/backend.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
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
    SharedButtonComponent,
    // Stelle sicher, dass BrowserAnimationsModule importiert wird
    MatIconModule,
    MatMenuModule,
    MatIconModule
  ]
})

export class VideoPageComponent {
  bubbles = [
    { left: -2, top: -3, visible: false, color: 'red', shape: 'circle' },
    { left: 20, top: 0, visible: false, color: 'blue', shape: 'star' },
    { left: -12, top: 14, visible: false, color: 'green', shape: 'moon' },
    { left: 10, top: -12, visible: false, color: 'yellow', shape: 'star' },
    { left: 0, top: 20, visible: false, color: 'purple', shape: 'circle' }
  ];

  videoContent = new VideoContent;
  id: string | null = '';
  videoUrl: string | null = '';
  currentTime: number = 0;
  totalTime: number = 0;
  intervalId: any;
  menuOpen = false;
  currentTimeVisible = false;
  preload: string = 'auto';
  media: any = '';
  api?: VgApiService;
  currentQuality: string = '';
  currentVideo: string | null = '';
  isLikedUp: boolean = false;
  isLikedDown: boolean = false;


  constructor(
    public route: ActivatedRoute,
    public backendService: BackendService,
    private apis: VgApiService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    if (this.id) {
      this.videoUrl = this.backendService.getVideoUrl(this.id);
      this.backendService.fetchVideoUrl(this.id).then((content: any) => {
        this.videoContent.username = content.username;
        this.videoContent.id = content.id;
        this.videoContent.videoFile = content.video;
        this.videoContent.title = content.title;
        this.videoContent.description = content.description;
        this.videoContent.created_at = content.created_at;
        this.videoContent.video_imgs = content.video_imgs;
        this.videoContent.view_count = content.view_count;
        console.log('videofile', this.videoContent.videoFile)
        console.log('video', this.videoContent);
        this.media = { src: this.videoContent.videoFile, type: 'video/mp4' };
      }).catch(error => {
        console.error('Error fetching video content:', error);
      });

    }
  }
  switchLike(x: 'isLikedUp' | 'isLikedDown', y: 'isLikedUp' | 'isLikedDown') {
    this.toggleLike(x, y);
    if (!this.id) {
      return
    }
        if (this.isLikedUp) {
            console.log('up');
            this.backendService.addLike(this.id, 'up');
        } else if (this.isLikedDown) {
            console.log('down');
            this.backendService.addLike(this.id, 'down');
        }
    
}

  toggleLike(x: 'isLikedUp' | 'isLikedDown', y: 'isLikedUp' | 'isLikedDown') {
    this[x] = !this[x];
    this[y] = false;

    this.bubbles.forEach(bubble => bubble.visible = this[x] && x === 'isLikedUp');  // Nur anzeigen, wenn isLikedUp aktiviert ist

  }


  customAction() {
    console.log('test button')
  }

  isMenuOpen() {
    if (this.menuOpen) {
      this.toggleMenu();
    }
  }


  toggleTimeDisplays() {
    this.currentTimeVisible = !this.currentTimeVisible;
  }


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  onPlayerReady(api: VgApiService) {
    this.api = api;
  }


  autoplay() {
    console.log("Autoplaying video");
    this.api?.play();
  }


  sharedLink(url: string | null) {
    if (navigator.clipboard) {
      if (!url) {
        alert('Kein Link zum Teilen vorhanden.');
        return;
      }

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



