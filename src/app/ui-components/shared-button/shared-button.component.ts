import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-button',
  standalone: true,
  imports: [],
  templateUrl: './shared-button.component.html',
  styleUrl: './shared-button.component.scss'
})
export class SharedButtonComponent {
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
  @Input() disabled: boolean = false;
  //function, input and co
  @Input() text: string = 'Click me';
  @Output() action = new EventEmitter<void>();
  @Input() type: string = 'button';
  handleClick() {
    this.action.emit(); // Sendet das Event nach außen
  }
}
