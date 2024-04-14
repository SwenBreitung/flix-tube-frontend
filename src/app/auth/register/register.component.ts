import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { User } from './../../models/user.class'
import { PrimaryButtonComponent } from "../../ui-components/primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../../ui-components/secondary-button/secondary-button.component";
@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        RouterModule,
        PrimaryButtonComponent,
        SecondaryButtonComponent
    ]
})
export class RegisterComponent {
  constructor(
    private router: Router, // Injizieren des Routers
  ){}
  user = new User();
  checkbox:boolean = false;
  register(form:any){}
  loginAsGuest(){}
}
