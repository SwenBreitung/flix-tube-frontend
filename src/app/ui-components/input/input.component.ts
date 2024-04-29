
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// import { filter } from 'rxjs';
import { RouterModule } from '@angular/router';
import { LayoutService } from './../../service/layout.service'
import { Component, Input, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent {
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
  @Input() text: string = 'Dummi';
  @Input() linkUrl: string = '/register';
  @Input() type: string = 'text';
  @Input() minlength: number = 5;
  @Input() placeholder: string = "Hier kannst du einen Text eintragen";
  constructor( 
    public router: Router, 
    public layoutService:LayoutService,
  ) {
    //  this.router.events.pipe(
    //    filter(event => event instanceof NavigationEnd)
    //  ).subscribe(() => {
    //    this.layoutService.isRegisterPage = this.router.url.includes('/register');
    //  });
  }

  value: string = '';

  onChange = (value: string) => {};
  onTouched = () => {};
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.minlength) {
  //     console.log('minlength changed:', this.minlength);
  //   }
  // }
  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Optional: set disabled state
  }
}
