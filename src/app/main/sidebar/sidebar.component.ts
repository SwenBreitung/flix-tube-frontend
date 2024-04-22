import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LayoutService } from './../../service/layout.service';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AnimationEvent } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, CommonModule,],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  providers: [provideAnimations()],
  // animations: [
  //   trigger('slideInOut', [
  //     state('in', style({ transform: 'translateX(0%)', visibility: 'visible', pointerEvents: 'auto' })),
  //     state('out', style({ transform: 'translateX(-100%)', visibility: 'hidden', pointerEvents: 'none' })),
  //     transition('out => in', animate('300ms ease-in')),
  //     transition('in => out', animate('300ms ease-out'))
  //   ])
  // ]
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0%)',
        visibility: 'visible',
        pointerEvents: 'auto',
        // Opazität auf 1 wenn die Sidebar sichtbar ist
      })),
      state('out', style({
        transform: 'translateX(-100%)',
        visibility: 'hidden',
        pointerEvents: 'none',
        // Opazität auf 0 wenn die Sidebar versteckt ist
      })),
      transition('out => in', animate('300ms ease-in')),
      transition('in => out', animate('2500ms ease-out'))
    ])
  ]
})
export class SidebarComponent {
  visibility: string = 'hidden';
  pointerEvents: string = 'none';
  constructor(
    public router: Router,
    public layoutService: LayoutService

  ) { }

  onAnimationStart(event: AnimationEvent) {
    if (event.toState === 'in') {
      this.visibility = 'visible';
      // this.pointerEvents = 'auto';
    }
  }

  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'out') {
      this.visibility = 'hidden';
      this.pointerEvents = 'none';
    }
  }

  // this.router.navigate(['/main/upload']);
  loadUploadFile() {
    this.router.navigate(['/main/upload']);
    this.layoutService.openSidebar = false;
  }

  // this.router.navigate(['/main/start-page']);

  loadStartPage() {
    this.router.navigate(['/main/start-page']);
    this.layoutService.openSidebar = false;
  }
  
  loadtestFile(){
    this.router.navigate(['/main/test']);
    this.layoutService.openSidebar = false;
  }
}
