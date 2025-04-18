import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destination } from '../models/destination.model';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getDestinationsFinales(userId: number|null): Observable<Destination[]> {
    return this.http.get<Destination[]>(`http://localhost:8080/api/destinations/finales?userId=${userId}`);
  }

  likerActivite(userId: number|null, activiteId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/favorisActivites/like`, {
      userId: userId,
      activiteId: activiteId
    });
  }
}
