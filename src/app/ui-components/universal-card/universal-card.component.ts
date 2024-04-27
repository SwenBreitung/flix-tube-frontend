import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-universal-card',
  standalone: true,
  imports: [],
  templateUrl: './universal-card.component.html',
  styleUrl: './universal-card.component.scss'
})
export class UniversalCardComponent {
  text:string='dummy';

  @Input() backgroundColor?: string;
  @Input() borderColor?: string;
  @Input() borderWidth?: string;
  @Input() borderRadius?: string;
  @Input() width?: string;
  @Input() height?: string;
  @Input() padding?: string;
  @Input() margin?: string;
  @Input() hoverBackgroundColor?: string;  
}
