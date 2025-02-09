import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collection, CollectionRequestDTO } from '@shared/types/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private readonly API_URL = `${environment.apiUrl}/collections`;

  constructor(private http: HttpClient) {}

  // Household methods
  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.API_URL}/household`);
  }

  createRequest(request: CollectionRequestDTO): Observable<Collection> {
    return this.http.post<Collection>(`${this.API_URL}`, request);
  }

  updateRequest(id: number, request: CollectionRequestDTO): Observable<Collection> {
    return this.http.put<Collection>(`${this.API_URL}/${id}`, request);
  }

  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  // Collector methods
  getCollectorRequests(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.API_URL}/collector`);
  }

  getAvailableRequests(city: string): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.API_URL}/available`, {
      params: { city }
    });
  }

  updateRequestStatus(requestId: number, status: string): Observable<Collection> {
    return this.http.put<Collection>(`${this.API_URL}/${requestId}/status`, null, {
      params: { status }
    });
  }

  completeCollection(requestId: number, actualWeight: number, photos: string[]): Observable<Collection> {
    return this.http.put<Collection>(`${this.API_URL}/${requestId}/complete`, {
      actualWeight,
      photos
    });
  }
}
