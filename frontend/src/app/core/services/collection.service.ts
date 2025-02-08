import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { CollectionRequestDTO } from '@shared/models/collection.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = `${environment.apiUrl}/collections`;

  constructor(private http: HttpClient) {}

  createCollection(request: CollectionRequestDTO): Observable<CollectionRequestDTO> {
    return this.http.post<CollectionRequestDTO>(`${this.apiUrl}`, request);
  }

  getCollections(): Observable<CollectionRequestDTO[]> {
    return this.http.get<CollectionRequestDTO[]>(`${this.apiUrl}/household`);
  }

  updateCollection(id: number, request: CollectionRequestDTO): Observable<CollectionRequestDTO> {
    return this.http.put<CollectionRequestDTO>(`${this.apiUrl}/${id}`, request);
  }

  cancelCollection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
