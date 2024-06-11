import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { User } from './../../models/user.class'
import { PrimaryButtonComponent } from "../../ui-components/primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../../ui-components/secondary-button/secondary-button.component";
import { Injectable } from '@angular/core'
import { AuthService } from './../../service/auth.service'
import { HttpClientModule } from '@angular/common/http';
import { RegistrationData } from './../../interfaces/registration-data.interface';
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
        SecondaryButtonComponent,
        HttpClientModule,
        
    ]
})
export class RegisterComponent {


    constructor(
        private router: Router,
        private authService: AuthService, // Injizieren des Routers
    ) { }
    user = new User();
    checkbox: boolean = false;
    email: string = ''


    // register(form: any) {
    //     if (!this.checkbox) {
    //         console.log('Checkbox is not checked');
    //         return;
    //     }

    //     const { username, email, password, password2 } = form.value;
    //     const data = { username, email, password, password2 };
    //     console.log('Form data:', data);



    //     const csrftoken = 'csrftoken';


    //     console.log('csrftoken', csrftoken);

    //     const headers: Record<string, string> = {
    //         'Content-Type': 'application/json'
    //     };

    //     if (csrftoken) {
    //         headers['X-CSRFToken'] = csrftoken; // Sicherstellen, dass das CSRF-Token hinzugefügt wird
    //     }

    //     fetch('http://127.0.0.1:8000/register/', {
    //         method: 'POST',
    //         headers: headers,
    //         body: JSON.stringify(data)
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok.');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             if (data.token) {
    //                 localStorage.setItem('token', data.token); // Speichern des DRF-Tokens
    //                 console.log('Success:', data.token);
    //             } else {
    //                 console.log('Token not found in response:', data);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // }



    register(form: any) {
        if (!this.checkbox) {
            console.log('Checkbox is not checked');
            return;
        }

        const { username, email, password, password2 } = form.value;
        const data: RegistrationData = { username, email, password, password2 };
        console.log('Form data:', data);

        this.authService.register(data).subscribe(
            (response: any) => {
                console.log('Success:', response);
                // this.router.navigate(['/dashboard']); // Navigate to dashboard or any other page after successful registration
                this.router.navigate(['/login']);
            },
            (error) => {
                console.error('Error:', error);
            }
        );
    }

    backToLogin() {
        console.log('return to login');
        this.router.navigate(['/login']);
    }
}
