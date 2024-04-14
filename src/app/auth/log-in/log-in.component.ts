import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PrimaryButtonComponent } from "../../ui-components/primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../../ui-components/secondary-button/secondary-button.component";

@Component({
    selector: 'app-log-in',
    standalone: true,
    templateUrl: './log-in.component.html',
    styleUrl: './log-in.component.scss',
    imports: [
        FormsModule,
        MatIconModule,
        PrimaryButtonComponent,
        SecondaryButtonComponent,
    ]
})
export class LogInComponent {
  constructor(
    private router: Router, // Injizieren des Routers
  ){}
  passwort:string ='';
  name:string ='';
  login(){
    console.log('test action login')
  }

  loginAsGuest(){}
}
