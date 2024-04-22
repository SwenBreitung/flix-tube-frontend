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
  
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
  
    if (csrftoken) {
      headers['X-CSRFToken'] = csrftoken; // Jetzt können Sie sicher ein neues Property hinzufügen
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
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  getCookie(name:string) {
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          return decodeURIComponent(cookie.substring(name.length + 1));
        }
      }
    }
    return undefined; 
  }

  backToLogin() { 
    console.log('return to login')
    this.router.navigate(['/login']);
  }
}
