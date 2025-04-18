import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activite } from '../models/activite.model';

@Injectable({
  providedIn: 'root',
})
export class ActiviteService {
  private baseUrl = 'http://localhost:8080/api/activites';

  constructor(private http: HttpClient) {}

  getAllActivites(): Observable<Activite[]> {
    return this.http.get<Activite[]>(this.baseUrl);
  }
  dislikeActivite(activiteId: number, userId: number|null): Observable<any> {
    return this.http.post('http://localhost:8080/api/favorisactivites/dislike', {
      activiteId,
      userId
    });
  }
  
}




















