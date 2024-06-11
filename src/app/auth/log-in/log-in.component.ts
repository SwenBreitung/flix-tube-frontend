import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PrimaryButtonComponent } from "../../ui-components/primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../../ui-components/secondary-button/secondary-button.component";
import { HttpClientModule } from '@angular/common/http';
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
  ) {}


  userName: string = '';
  password: string = '';


  login() {
    let userName: string = this.userName;
    let password: string = this.password;

    console.log(this.userName);
    console.log(this.password);
    fetch('http://127.0.0.1:8000/simple_login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
           
        },
        body: JSON.stringify({ username: userName, password: password }),
        credentials: 'include' // Wichtig: Damit Cookies mitgesendet werden
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Login failed');
        }
    })
    .then(data => {
        // Kein direkter Zugriff auf das Token; es wird als HttpOnly-Cookie gesetzt
        this.userName = '';
        this.password = '';
        console.log('data', data)
        this.router.navigate(['/main']);
    })
    .catch(error => {
        console.error('Login error:', error);
        alert('Falscher Benutzername oder ungültige Anmeldeinformationen.');
        return false;
    });
}

// Hilfsfunktion, um Cookies zu lesen (falls benötigt)
getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Prüfen, ob das Cookie mit dem Namen beginnt
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
  loginAsGuest() { 
    // this.userName = 'gast';
    // this.password = 'gast';
    // this.login()
  }

}
