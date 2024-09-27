import { Component } from '@angular/core';
// import { MatIconModule } from '@angular/material/icon';
import { LayoutService } from './../../service/layout.service';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
// import { trigger, state, style, transition, animate } from '@angular/animations';
// import { AnimationEvent } from '@angular/animations';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
// provideAnimations()
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ CommonModule,MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  providers: [],
  // animations: [
  //   trigger('slideInOut', [
  //     state('in', style({ transform: 'translateX(0%)', visibility: 'visible', pointerEvents: 'auto' })),
  //     state('out', style({ transform: 'translateX(-100%)', visibility: 'hidden', pointerEvents: 'none' })),
  //     transition('out => in', animate('300ms ease-in')),
  //     transition('in => out', animate('300ms ease-out'))
  //   ])
  // ]
  // animations: [
  //   trigger('slideInOut', [
  //     state('in', style({
  //       transform: 'translateX(0%)',
  //       visibility: 'visible',
  //       pointerEvents: 'auto',
  //       // Opazität auf 1 wenn die Sidebar sichtbar ist
  //     })),
  //     state('out', style({
  //       transform: 'translateX(-100%)',
  //       visibility: 'hidden',
  //       pointerEvents: 'none',
  //       // Opazität auf 0 wenn die Sidebar versteckt ist
  //     })),
  //     transition('out => in', animate('300ms ease-in')),
  //     transition('in => out', animate('2500ms ease-out'))
  //   ])
  // ]
})
export class SidebarComponent {
  visibility: string = 'hidden';
  pointerEvents: string = 'none';
  constructor(
    public router: Router,
    public layoutService: LayoutService

  ) { }


  /**
 * Navigates the user to the upload page and closes the sidebar.
 * After navigating to the upload page, the sidebar is closed by setting `openSidebar` to false.
 */
  loadUploadFile() {
    this.router.navigate(['main/upload']);   
    this.layoutService.openSidebar = false;
  }


  /**
 * Navigates the user to the start page and closes the sidebar.
 * After navigating to the start page, the sidebar is closed by setting `openSidebar` to false.
 */
  loadStartPage() {
    this.router.navigate(['main/start-page']);
    this.layoutService.openSidebar = false;
  }
  

/**
 * Navigates the user to the test page and closes the sidebar.
 * After navigating to the test page, the sidebar is closed by setting `openSidebar` to false.
 */
  loadtestFile(){
    this.router.navigate(['/main/test']);
    this.layoutService.openSidebar = false;
    console.log(this.layoutService.openSidebar)
  }
}
