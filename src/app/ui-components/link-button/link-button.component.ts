import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RouterModule } from '@angular/router';
import { LayoutService } from './../../service/layout.service'
@Component({
  selector: 'app-link-button',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './link-button.component.html',
  styleUrl: './link-button.component.scss'
})
export class LinkButtonComponent {
  //styles
  @Input() backgroundColor?: string;
  @Input() borderColor?: string;
  @Input() borderWidth?: string;
  @Input() borderRadius?: string;
  @Input() width?: string;
  @Input() height?: string;
  @Input() padding?: string;
  @Input() margin?: string;
  @Input() hoverBackgroundColor?: string;  

  //links and co
  @Input() buttonText: string = 'Dummi';
  @Input() linkUrl: string = '/register';
 
  constructor( 
    public router: Router, 
    public layoutService:LayoutService,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.layoutService.isRegisterPage = this.router.url.includes('/register');
    });
  }
 
  // private activatedRoute: ActivatedRoute,
  

}
