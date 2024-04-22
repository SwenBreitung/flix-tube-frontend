// import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ContentComponent } from "./content/content.component";
import { MatIconModule } from '@angular/material/icon'; 
import { LayoutService } from './../service/layout.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { RouterModule } from "@angular/router";
@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    providers: [provideAnimations()], 
    imports: [HeaderComponent, SidebarComponent, ContentComponent,MatIconModule,RouterModule],
    // animations: [
    //     trigger('slideInOut', [
    //       state('in', style({ transform: 'translateX(0%)', visibility: 'visible', pointerEvents: 'auto' })),
    //       state('out', style({ transform: 'translateX(-100%)', visibility: 'hidden', pointerEvents: 'none' })),
    //       transition('out => in', animate('300ms ease-in')),
    //       transition('in => out', animate('300ms ease-out'))
    //     ])
    //   ],
})
export class MainComponent {
    constructor(
        public layoutService: LayoutService
    
    ) {}
}
