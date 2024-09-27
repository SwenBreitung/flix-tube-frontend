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
        this.videoContent.up_likes_count = content.up_likes_count;
        this.videoContent.liked_up = content.liked_up;
        this.videoContent.liked_down = content.liked_down;
        this.media = { src: this.videoContent.videoFile, type: 'video/mp4' };
      }).catch(error => {
        console.error('Error fetching video content:', error);
      });
    }
  }


/**
 * Handles the like button switch logic. Toggles the like state and sends
 * the like action ('up' or 'down') to the backend service based on the button pressed.
 * @param x - The current like status ('isLikedUp' or 'isLikedDown').
 * @param y - The previous like status ('isLikedUp' or 'isLikedDown').
 */
  switchLike(x: 'isLikedUp' | 'isLikedDown', y: 'isLikedUp' | 'isLikedDown') {
    console.log('test like button',x)
    this.toggleLike(x, y);
    if (!this.id) {
      return
    }
    if (x == 'isLikedUp') {
            console.log('up');
            this.backendService.addLike(this.id, 'up');
        } else if (x == 'isLikedDown') {
            console.log('down');
            this.backendService.addLike(this.id, 'down');
        }   
}


/**
 * Toggles the like status for the current like ('isLikedUp' or 'isLikedDown'),
 * resets the opposite like status, and updates the visibility of bubbles
 * based on whether 'isLikedUp' is active.
 * @param x - The current like status to toggle ('isLikedUp' or 'isLikedDown').
 * @param y - The opposite like status to reset.
 */
  toggleLike(x: 'isLikedUp' | 'isLikedDown', y: 'isLikedUp' | 'isLikedDown') {
    this[x] = !this[x];
    this[y] = false;
    this.bubbles.forEach(bubble => bubble.visible = this[x] && x === 'isLikedUp'); 
  }


/**
 * Checks if the menu is open, and if so, toggles the menu to close it.
 */
  isMenuOpen() {
    if (this.menuOpen) {
      this.toggleMenu();
    }
  }


  /**
 * Toggles the visibility of the current time display by inverting its current state.
 */
  toggleTimeDisplays() {
    this.currentTimeVisible = !this.currentTimeVisible;
  }


  /**
 * Toggles the menu's open state by inverting the current `menuOpen` status.
 */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  /**
 * Sets the player API once the video player is ready.
 * @param api - The VgApiService instance representing the video player API.
 */
  onPlayerReady(api: VgApiService) {
    this.api = api;
  }


  /**
 * Automatically starts video playback if the player API is available.
 */
  autoplay() {
    this.api?.play();
  }


  /**
 * Copies the provided URL to the clipboard if the clipboard API is available.
 * If no URL is provided, it shows an alert notifying the user that no link is available to share.
 * Displays a success message on successful copy or an error message if the copy fails.
 * 
 * @param url - The URL to be copied to the clipboard. If null, an alert is shown.
 */
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



