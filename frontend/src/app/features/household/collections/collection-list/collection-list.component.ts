import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CollectionService } from '@core/services/collection.service';
import { Collection } from '@shared/types/models';
import { NewCollectionDialogComponent } from '../new-collection-dialog/new-collection-dialog.component';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-collection-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <!-- Header with Create and Logout -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-800">My Collections</h1>
          <div class="flex gap-4">
            <button mat-raised-button 
                    color="primary" 
                    (click)="openNewCollectionDialog()"
                    class="flex items-center gap-2">
              <mat-icon>add</mat-icon>
              New Collection
            </button>
            <button mat-raised-button 
                    color="warn" 
                    (click)="logout()"
                    class="flex items-center gap-2">
              <mat-icon>logout</mat-icon>
              Logout
            </button>
          </div>
        </div>

        <!-- Error Message -->
        <div *ngIf="error" class="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {{ error }}
        </div>

        <!-- Collections List -->
        <div *ngIf="collections.length === 0" class="text-center text-gray-500 py-8">
          You haven't created any collection requests yet.
        </div>

        <div *ngFor="let collection of collections" class="mb-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-semibold">Collection #{{ collection.id }}</h3>
              <p class="text-gray-600">Address: {{ collection.collectionAddress }}</p>
              <p class="text-gray-600">City: {{ collection.city }}</p>
              <p class="text-gray-600">Weight: {{ collection.weightInGrams / 1000 }} kg</p>
              <p class="text-gray-600">Waste Types: {{ collection.wasteTypes.join(', ') }}</p>
              <p class="text-gray-600">Status: {{ collection.status }}</p>
              <p *ngIf="collection.notes" class="text-gray-600">Notes: {{ collection.notes }}</p>
            </div>
            <div class="space-x-2">
              <button *ngIf="collection.status === 'PENDING'"
                      mat-icon-button color="primary"
                      (click)="editCollection(collection)">
                <mat-icon>edit</mat-icon>
              </button>
              <button *ngIf="collection.status === 'PENDING'"
                      mat-icon-button color="warn"
                      (click)="deleteCollection(collection.id)">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CollectionListComponent implements OnInit {
  collections: Collection[] = [];
  error: string | null = null;

  constructor(
    private collectionService: CollectionService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCollections();
  }

  loadCollections(): void {
    this.collectionService.getHouseholdRequests().pipe(
      catchError(error => {
        this.error = 'Failed to load collections';
        console.error('Error loading collections:', error);
        return of([]);
      })
    ).subscribe(collections => {
      this.collections = collections;
    });
  }

  openNewCollectionDialog(): void {
    const dialogRef = this.dialog.open(NewCollectionDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCollections();
      }
    });
  }

  editCollection(collection: Collection): void {
    const dialogRef = this.dialog.open(NewCollectionDialogComponent, {
      width: '500px',
      data: collection
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCollections();
      }
    });
  }

  deleteCollection(id: number): void {
    if (confirm('Are you sure you want to delete this collection?')) {
      this.collectionService.deleteRequest(id).pipe(
        catchError(error => {
          this.error = 'Failed to delete collection';
          console.error('Error deleting collection:', error);
          return of(null);
        })
      ).subscribe(() => {
        this.loadCollections();
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
