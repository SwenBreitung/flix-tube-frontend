import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PrimaryButtonComponent } from "../../ui-components/primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../../ui-components/secondary-button/secondary-button.component";
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    HttpClientModule,
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  constructor(
    private router: Router, 
    private http: HttpClient,
  ) {}


  userName: string = '';
  password: string = '';


  loginCommon(url: string, bodyData?: any) {
    let fetchOptions: any = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    };
    if (bodyData) {
        fetchOptions.body = JSON.stringify(bodyData);
    }

    fetch(url, fetchOptions)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Login failed');
        }
    })
    .then(data => {
        this.userName = '';
        this.password = '';
        console.log('data', data);
        localStorage.setItem('token', data.token); 
        this.router.navigate(['/main']);  
    })
    .catch(error => {
        console.error('Login error:', error);
        alert('Falscher Benutzername oder ungültige Anmeldeinformationen.');
        return false;
    });
}
loginAsGuest() {
  this.loginCommon('http://localhost:8000/guest-login/');
}



login() {
  let userName = this.userName;
  let password = this.password;

  console.log(userName);
  console.log(password);
  this.loginCommon('http://127.0.0.1:8000/simple_login/', { username: userName, password: password });
}


}


