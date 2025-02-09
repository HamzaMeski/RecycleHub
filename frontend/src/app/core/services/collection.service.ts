import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Collection } from '@shared/types/models';
import { environment } from '@env/environment';
import { tap } from 'rxjs/operators';

export interface CompleteCollectionDTO {
  actualWeight: number;  // Weight in grams
  photos: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = `${environment.apiUrl}/collections`;

  constructor(private http: HttpClient) {}

  // Common endpoints
  getRequestById(requestId: number): Observable<Collection> {
    return this.http.get<Collection>(`${this.apiUrl}/${requestId}`);
  }

  // Collector endpoints
  getAvailableRequests(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}/available`);
  }

  getCollectorRequests(): Observable<Collection[]> {
    console.log('Getting collector requests...'); 
    return this.http.get<Collection[]>(`${this.apiUrl}/collector`).pipe(
      tap(response => console.log('Collector requests response:', response)) 
    );
  }

  updateRequestStatus(requestId: number, status: 'PENDING' | 'OCCUPIED' | 'IN_PROGRESS' | 'VALIDATED' | 'REJECTED'): Observable<Collection> {
    return this.http.put<Collection>(`${this.apiUrl}/${requestId}/status`, null, {
      params: { status }
    });
  }

  completeCollection(requestId: number, actualWeight: number, photos: string[]): Observable<Collection> {
    const completeRequest: CompleteCollectionDTO = {
      actualWeight,  // Already in grams from dialog
      photos
    };
    console.log('Service - Complete request:', {
      requestId,
      actualWeight,
      photosCount: photos.length,
      request: completeRequest
    });
    return this.http.put<Collection>(`${this.apiUrl}/${requestId}/complete`, completeRequest).pipe(
      tap(response => console.log('Service - Complete response:', response)),
      catchError(error => {
        console.error('Service - Complete error:', {
          error,
          request: completeRequest,
          response: error.error
        });
        throw error;
      })
    );
  }

  // Household endpoints
  createRequest(request: Partial<Collection>): Observable<Collection> {
    return this.http.post<Collection>(this.apiUrl, request);
  }

  updateRequest(requestId: number, request: Partial<Collection>): Observable<Collection> {
    return this.http.put<Collection>(`${this.apiUrl}/${requestId}`, request);
  }

  deleteRequest(requestId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${requestId}`);
  }

  getHouseholdRequests(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}/household`);
  }
}
