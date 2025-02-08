import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collection } from '@store/models/collection.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = `${environment.apiUrl}/collections`;

  constructor(private http: HttpClient) {}

  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.apiUrl);
  }

  getCollectionById(id: number): Observable<Collection> {
    return this.http.get<Collection>(`${this.apiUrl}/${id}`);
  }

  createCollection(collection: Partial<Collection>): Observable<Collection> {
    return this.http.post<Collection>(this.apiUrl, collection);
  }

  updateCollection(id: number, collection: Partial<Collection>): Observable<Collection> {
    return this.http.put<Collection>(`${this.apiUrl}/${id}`, collection);
  }

  cancelCollection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadPhotos(id: number, photos: File[]): Observable<string[]> {
    const formData = new FormData();
    photos.forEach(photo => {
      formData.append('photos', photo);
    });
    return this.http.post<string[]>(`${this.apiUrl}/${id}/photos`, formData);
  }
}
