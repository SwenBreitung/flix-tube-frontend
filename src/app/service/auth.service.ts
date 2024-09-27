
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private backendService: BackendService,
  ) {}

  user: any = '';


  /**
 * Registers a new user by sending their details to the backend server.
 * The request includes credentials (e.g., cookies) for authentication.
 */
  register(user: any) {
    //return this.http.post('http://34.17.50.169/register/', user, { withCredentials: true });
    return this.http.post('http://127.0.0.1:8000/register/', user, { withCredentials: true });
  }


/**
 * Logs the user out by sending a POST request to the server's logout endpoint.
 * If the logout is successful, the authentication token is removed from localStorage,
 * and the user is redirected to the login page. Handles errors if the logout fails.
 */
  logout() {
    const token = localStorage.getItem('token');  
    fetch('http://127.0.0.1:8000/logout/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,  
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (response.ok) {
        localStorage.removeItem('token');  
        this.router.navigate(['/login']);  
      } else {
        throw new Error('Logout failed');
      }
    })
    .catch(error => {
      console.error('Logout error:', error);
    });
  }


  /**
 * Checks if the user is authenticated by sending a GET request to the server's authentication check endpoint.
 * If the user is authenticated, the user data is stored and their username is capitalized.
 * If not authenticated, the user is redirected to the login page.
 */
  checkAuth() {
    const token = localStorage.getItem('token'); 
    fetch('http://127.0.0.1:8000/check_auth/', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,  
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Not authenticated');
      }
    })
    .then(data => {
      this.backendService.user = data.user;
      this.backendService.capitalizeFirstLetter(data.user.username);
    })
    .catch(error => {
      console.error('Authentication check failed:', error);
      this.router.navigate(['/login']);
    });
  }
}
