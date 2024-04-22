// import { Component } from '@angular/core';
import { MessagesComponent } from './messages/messages.component';
import { Component } from '@angular/core';
import { RouterModule,  } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ RouterModule,],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  constructor(
    // private router: Router
  ) {}

  ngOnInit() {
    console.log('ContentComponent initialized');
  }

  ngOnDestroy() {
    console.log('ContentComponent destroyed');
  }


}
