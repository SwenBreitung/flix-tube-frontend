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
    private router: Router, 
  ) {}


  userName: string = '';
  password: string = '';


  login() {
    let userName: string = this.userName;
    let password: string = this.password;

    console.log(this.userName)
    console.log(this.password)
    fetch('http://127.0.0.1:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: userName, password: password }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Login failed');
        }
      })
      .then(data => {
        localStorage.setItem('token', data.token); 
        this.userName = '';
        this.password = '';
        this.router.navigate(['/main']);
      })
      .catch(error => {
        console.error('Login error:', error);
        alert('Falscher Benutzername oder ungültige Anmeldeinformationen.'); // Fehlermeldung für den Benutzer
        return false; // Formular nicht senden
        // Implementieren Sie hier eine Fehlerbehandlung, z. B. eine Meldung für den Benutzer
      });
  }

  loginAsGuest() { 
    this.userName = 'gast';
    this.password = 'gast';
    this.login()
  }
}
