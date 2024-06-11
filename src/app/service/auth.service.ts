
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, 
    private router: Router,
  ) 
    {}


    register(user: any) {
      return this.http.post('http://127.0.0.1:8000/register/', user, { withCredentials: true });
    }

    login(credentials: any) {
      return this.http.post('http://127.0.0.1:8000/login/', credentials, { withCredentials: true });
    }
  
    logout() {
      this.http.post('http://127.0.0.1:8000/logout/', {}, { withCredentials: true }).subscribe(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      });
    }


    checkAuth() {
      fetch('http://127.0.0.1:8000/check_auth/', {
          method: 'GET',
          credentials: 'include' // Wichtig: Damit Cookies mitgesendet werden
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Not authenticated');
          }
      })
      .then(data => {
          // Authentifizierung erfolgreich, Benutzer ist eingeloggt
          console.log('User is authenticated', data);
          // Sie können hier Benutzerinformationen speichern oder entsprechende Aktionen ausführen
      })
      .catch(error => {
          console.error('Authentication check failed:', error);
          // Benutzer ist nicht eingeloggt, Weiterleitung zur Login-Seite
          this.router.navigate(['/login']);
      });
    }
    
}
