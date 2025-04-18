import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/login.request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/users/login'; // l'URL correspond à l'API

  constructor(private http: HttpClient) { }

  login(email: string, motdepass: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/users/login', { email, motdepass })
      .pipe(
        tap(response => {
          // Sauvegarde les infos utiles dans le localStorage
          localStorage.setItem('user', JSON.stringify(response.user));
        })
      );
  }
  
  
  getUserId(): number | null {
    const user = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      return userObj.id;
    }
    return null;
  }
  

  setToken(token: string) {
    // Sauvegarder le token dans le localStorage
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    // Récupérer le token depuis le localStorage
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('user');
  }
  
}
