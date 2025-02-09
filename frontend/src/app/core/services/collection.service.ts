import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Collection, CollectionRequestDTO } from '@shared/types/models';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = `${environment.apiUrl}/collections`;

  constructor(private http: HttpClient) {}

  createCollection(request: CollectionRequestDTO): Observable<Collection> {
    return this.http.post<Collection>(`${this.apiUrl}`, request);
  }

  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}/household`);
  }

  updateCollection(id: number, request: CollectionRequestDTO): Observable<Collection> {
    return this.http.put<Collection>(`${this.apiUrl}/${id}`, request);
  }

  cancelCollection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
