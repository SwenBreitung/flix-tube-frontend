import { Component } from '@angular/core';
import { MessagesComponent } from './messages/messages.component';
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [MessagesComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {

}
