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
  ) { }
  user = new User();
  checkbox: boolean = false;
  email:string=''

  
  register(form: any) {
    if (!this.checkbox) {
        console.log('Checkbox is not checked');
        return;
    }

    const {username, email, password, password2 } = form.value;
    const data = {username, email, password, password2 };
    console.log('Form data:', data);
    const csrftoken = this.getCookie('csrftoken');
    console.log(csrftoken);
    
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    if (csrftoken) {
        headers['X-CSRFToken'] = csrftoken; // Sicherstellen, dass das CSRF-Token hinzugefügt wird
    }

    fetch('http://127.0.0.1:8000/register/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        if (data.token) { // Stellen Sie sicher, dass das Token in der Antwort vorhanden ist
            localStorage.setItem('authToken', data.token); // Speichern des Tokens
            console.log('Success:', data.token);
        } else {
            console.log('Token not found in response:', data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length >= 2) {
      const cookieValue = parts.pop(); // Kann immer noch undefined sein
      if (cookieValue !== undefined) {
          return cookieValue.split(';').shift() || null; // Sicheres Extrahieren des Wertes
      }
  }
  return null;
}
  //   getCookie(name: string): string | null {
  //   let ca: Array<string> = document.cookie.split(';');
  //   let caLen: number = ca.length;
  //   let cookieName = `${name}=`;
  //   let c: string;

  //   for (let i: number = 0; i < caLen; i += 1) {
  //       c = ca[i].replace(/^\s+/g, '');
  //       if (c.indexOf(cookieName) == 0) {
  //           return c.substring(cookieName.length, c.length);
  //       }
  //   }
  //   return null;
  // }

  backToLogin() { 
    console.log('return to login')
    this.router.navigate(['/login']);
  }
}
