import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    MatDialogModule,
    MatTooltipModule
  ],
  styles: [`
    .action-buttons {
      display: flex;
      gap: 8px;
      margin-left: 16px;
    }
    .action-buttons button {
      min-width: 40px;
      height: 40px;
      line-height: 40px;
    }
    .action-buttons mat-icon {
      font-size: 20px;
    }
  `],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <!-- Header with Create and Logout -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-800">My Collections</h1>
        </div>

        <!-- Error Message -->
        <div *ngIf="error" class="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {{ error }}
        </div>

        <!-- Collections List -->
        <div class="space-y-4">
          <div *ngFor="let collection of collections"
               class="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div class="space-y-2">
                <!-- Collection ID and Status -->
                <div class="flex items-center gap-3">
                  <h3 class="text-lg font-semibold">Collection #{{ collection.id }}</h3>
                  <span class="px-2 py-1 text-xs rounded-full"
                        [ngClass]="{
                          'bg-gray-100 text-gray-800': collection.status === 'PENDING',
                          'bg-blue-100 text-blue-800': collection.status === 'OCCUPIED',
                          'bg-yellow-100 text-yellow-800': collection.status === 'IN_PROGRESS',
                          'bg-green-100 text-green-800': collection.status === 'VALIDATED',
                          'bg-red-100 text-red-800': collection.status === 'REJECTED'
                        }">
                    {{ collection.status }}
                  </span>
                </div>

                <!-- Collection Details -->
                <div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p class="font-medium">Address:</p>
                    <p>{{ collection.collectionAddress }}</p>
                    <p>{{ collection.city }}</p>
                  </div>
                  <div>
                    <p class="font-medium">Weight:</p>
                    <p>{{ collection.weightInGrams / 1000 }} kg</p>
                  </div>
                </div>

                <!-- Waste Types -->
                <div class="flex flex-wrap gap-2 mt-2">
                  <span *ngFor="let type of collection.wasteTypes"
                        class="px-3 py-1 text-xs rounded-full"
                        [ngClass]="{
                          'bg-blue-100 text-blue-800': type === 'PLASTIC',
                          'bg-green-100 text-green-800': type === 'PAPER',
                          'bg-purple-100 text-purple-800': type === 'GLASS',
                          'bg-yellow-100 text-yellow-800': type === 'METAL'
                        }">
                    {{ type }}
                  </span>
                </div>

                <!-- Notes if any -->
                <p *ngIf="collection.notes" class="text-sm text-gray-500 mt-2">
                  <span class="font-medium">Notes:</span> {{ collection.notes }}
                </p>
              </div>

              <!-- Action Buttons -->
              <div class="action-buttons">
                <button mat-mini-fab
                        color="primary"
                        matTooltip="Edit Collection"
                        *ngIf="collection.status.toUpperCase() === 'PENDING'"
                        (click)="editCollection(collection)">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-mini-fab
                        color="accent"
                        matTooltip="View Details"
                        (click)="viewCollection(collection)">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button mat-mini-fab
                        color="warn"
                        matTooltip="Delete Collection"
                        *ngIf="collection.status.toUpperCase() === 'PENDING'"
                        (click)="deleteCollection(collection.id)">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- No Collections Message -->
        <div *ngIf="collections.length === 0" class="text-center text-gray-500 py-8">
          You haven't created any collection requests yet.
        </div>
      </div>
    </div>
  `
})
export class CollectionListComponent implements OnInit {
  collections: Collection[] = [];
  error: string | null = null;
  displayedColumns = ['id', 'address', 'weight', 'wasteTypes', 'status', 'actions'];

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

  viewCollection(collection: Collection): void {
    // TO DO: implement view collection functionality
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
