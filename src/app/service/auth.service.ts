
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
  ) { }

  user: any = '';
  register(user: any) {
    //return this.http.post('http://34.17.50.169/register/', user, { withCredentials: true });
    return this.http.post('http://127.0.0.1:8000/register/', user, { withCredentials: true });
  }

  // login(credentials: any) {
  //   return this.http.post('http://127.0.0.1:8000/login/', credentials, { withCredentials: true });
  // }


  logout() {
    const token = localStorage.getItem('token');  // Hole den Token aus dem localStorage
  
    fetch('http://127.0.0.1:8000/logout/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,  // Sende den Token im Header
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (response.ok) {
        localStorage.removeItem('token');  // Token nach erfolgreichem Logout entfernen
        this.router.navigate(['/login']);  // Weiterleitung zur Login-Seite
      } else {
        throw new Error('Logout failed');
      }
    })
    .catch(error => {
      console.error('Logout error:', error);
    });
  }

  checkAuth() {
    const token = localStorage.getItem('token'); 
    fetch('http://127.0.0.1:8000/check_auth/', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,  // Sende den Token im Header
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
      console.log('User is authenticated', data);
      this.backendService.user = data.user;
      this.backendService.capitalizeFirstLetter(data.user.username);
    })
    .catch(error => {
      console.error('Authentication check failed:', error);
      this.router.navigate(['/login']);
    });
  }
  // getTokenFromCookies() {
  //   const cookie = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
  //   if (cookie) {
  //     return cookie.split('=')[1];  // Den Token-Wert zurückgeben
  //   }
  //   return null;
  // }
}
