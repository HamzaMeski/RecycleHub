import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CollectionService } from '@core/services/collection.service';
import { Collection } from '@shared/types/models';
import { NewCollectionDialogComponent } from '../new-collection-dialog/new-collection-dialog.component';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-collection-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-800">My Collections</h1>
          <button mat-raised-button color="primary" (click)="openNewCollectionDialog()">
            <mat-icon>add</mat-icon>
            New Collection
          </button>
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
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCollections();
  }

  loadCollections(): void {
    this.collectionService.getHouseholdRequests().subscribe({
      next: (collections: Collection[]) => {
        this.collections = collections;
      },
      error: (error: Error) => {
        this.error = 'Failed to load collections';
        console.error('Error loading collections:', error);
      }
    });
  }

  openNewCollectionDialog(): void {
    const dialogRef = this.dialog.open(NewCollectionDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.collectionService.createRequest(result).pipe(
          catchError(error => {
            this.error = 'Failed to create collection';
            console.error('Error creating collection:', error);
            return of(null);
          })
        ).subscribe(response => {
          if (response) {
            this.loadCollections();
          }
        });
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
        this.collectionService.updateRequest(collection.id, result).pipe(
          catchError(error => {
            this.error = 'Failed to update collection';
            console.error('Error updating collection:', error);
            return of(null);
          })
        ).subscribe(response => {
          if (response) {
            this.loadCollections();
          }
        });
      }
    });
  }

  deleteCollection(id: number): void {
    if (confirm('Are you sure you want to delete this collection request?')) {
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
}
