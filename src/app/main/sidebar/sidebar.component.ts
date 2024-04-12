import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'; 
import { LayoutService } from './../../service/layout.service';
import { CommonModule } from '@angular/common';
 import {  provideAnimations } from '@angular/platform-browser/animations';
 import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule,CommonModule],
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
})
export class SidebarComponent {
  constructor(
    public layoutService: LayoutService

  ) {}
}
