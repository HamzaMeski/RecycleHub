import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CollectionService } from '@core/services/collection.service';
import { Collection } from '@shared/types/models';
import { CompleteCollectionDialogComponent } from '../complete-collection-dialog/complete-collection-dialog.component';
import { catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-collector-collection-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <!-- Header with Logout -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-800">Collection Requests</h1>
        </div>

        <!-- Error Message -->
        <div *ngIf="error" class="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {{ error }}
        </div>

        <mat-tab-group (selectedTabChange)="onTabChange($event)">
          <!-- Available Collections Tab -->
          <mat-tab label="Available Collections">
            <div class="mt-6">
              <!-- Filters -->
              <div class="bg-gray-50 p-4 rounded-lg mb-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <!-- City Filter -->
                  <mat-form-field>
                    <mat-label>City</mat-label>
                    <input matInput [(ngModel)]="cityFilter" (ngModelChange)="applyFilter()">
                    <mat-hint>Filter collections by city</mat-hint>
                  </mat-form-field>

                  <!-- Country Filter -->
                  <mat-form-field>
                    <mat-label>Country</mat-label>
                    <input matInput [(ngModel)]="countryFilter" (ngModelChange)="applyFilter()">
                    <mat-hint>Filter collections by country</mat-hint>
                  </mat-form-field>

                  <!-- Clear Filters -->
                  <div class="flex items-end">
                    <button mat-button color="warn" (click)="clearFilters()">
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>

              <!-- No Collections Message -->
              <div *ngIf="filteredCollections.length === 0" class="text-center text-gray-500 py-8">
                No available collection requests found.
              </div>

              <!-- Collections Table -->
              <div *ngIf="filteredCollections.length > 0" class="overflow-x-auto">
                <table mat-table [dataSource]="filteredCollections" matSort class="w-full">
                  <!-- ID Column -->
                  <ng-container matColumnDef="id">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>
                    <td mat-cell *matCellDef="let collection">#{{ collection.id }}</td>
                  </ng-container>

                  <!-- Address Column -->
                  <ng-container matColumnDef="address">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Address</th>
                    <td mat-cell *matCellDef="let collection">
                      {{ collection.collectionAddress }}<br>
                      <span class="text-sm text-gray-500">{{ collection.city }}</span>
                    </td>
                  </ng-container>

                  <!-- Weight Column -->
                  <ng-container matColumnDef="weight">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Est. Weight</th>
                    <td mat-cell *matCellDef="let collection">{{ collection.weightInGrams / 1000 }} kg</td>
                  </ng-container>

                  <!-- Waste Types Column -->
                  <ng-container matColumnDef="wasteTypes">
                    <th mat-header-cell *matHeaderCellDef>Waste Types</th>
                    <td mat-cell *matCellDef="let collection">
                      <mat-chip-set>
                        <mat-chip *ngFor="let type of collection.wasteTypes">{{ type }}</mat-chip>
                      </mat-chip-set>
                    </td>
                  </ng-container>

                  <!-- Actions Column -->
                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Actions</th>
                    <td mat-cell *matCellDef="let collection">
                      <button mat-raised-button color="primary" (click)="acceptCollection(collection.id)">
                        Accept Request
                      </button>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="availableColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: availableColumns;"></tr>
                </table>

                <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
              </div>
            </div>
          </mat-tab>

          <!-- My Collections Tab -->
          <mat-tab label="My Collections">
            <div class="mt-6">
              <!-- Collections Table -->
              <div class="overflow-x-auto">
                <table mat-table [dataSource]="myCollections" matSort class="w-full">
                  <!-- ID Column -->
                  <ng-container matColumnDef="id">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>
                    <td mat-cell *matCellDef="let collection">#{{ collection.id }}</td>
                  </ng-container>

                  <!-- Address Column -->
                  <ng-container matColumnDef="address">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Address</th>
                    <td mat-cell *matCellDef="let collection">
                      {{ collection.collectionAddress }}<br>
                      <span class="text-sm text-gray-500">{{ collection.city }}</span>
                    </td>
                  </ng-container>

                  <!-- Weight Column -->
                  <ng-container matColumnDef="weight">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Est. Weight</th>
                    <td mat-cell *matCellDef="let collection">
                      <div>Est: {{ collection.weightInGrams / 1000 }} kg</div>
                    </td>
                  </ng-container>

                  <!-- Actual Weight Column -->
                  <ng-container matColumnDef="actualWeight">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Actual Weight</th>
                    <td mat-cell *matCellDef="let collection">
                      <span *ngIf="collection.actualWeightInGrams !== undefined && collection.actualWeightInGrams !== null" class="text-green-600">
                        {{ collection.actualWeightInGrams / 1000 }} kg
                      </span>
                      <span *ngIf="collection.actualWeightInGrams === undefined || collection.actualWeightInGrams === null" class="text-gray-400">
                        Not measured
                      </span>
                    </td>
                  </ng-container>

                  <!-- Status Column -->
                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
                    <td mat-cell *matCellDef="let collection">
                      <span [class]="getStatusClass(collection.status)">
                        {{ collection.status }}
                      </span>
                    </td>
                  </ng-container>

                  <!-- Waste Types Column -->
                  <ng-container matColumnDef="wasteTypes">
                    <th mat-header-cell *matHeaderCellDef>Waste Types</th>
                    <td mat-cell *matCellDef="let collection">
                      <mat-chip-set>
                        <mat-chip *ngFor="let type of collection.wasteTypes">{{ type }}</mat-chip>
                      </mat-chip-set>
                    </td>
                  </ng-container>

                  <!-- Actions Column -->
                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Actions</th>
                    <td mat-cell *matCellDef="let collection">
                      <button *ngIf="collection.status === 'OCCUPIED'"
                              mat-raised-button color="accent"
                              (click)="startCollection(collection.id)">
                        Start Collection
                      </button>
                      <button *ngIf="collection.status === 'IN_PROGRESS'"
                              mat-raised-button color="primary"
                              (click)="completeCollection(collection)">
                        Complete Collection
                      </button>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                </table>

                <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `
})
export class CollectorCollectionListComponent implements OnInit {
  availableCollections: Collection[] = [];
  filteredCollections: Collection[] = [];
  myCollections: Collection[] = [];
  error: string | null = null;
  cityFilter: string = '';
  countryFilter: string = '';

  // Table columns
  availableColumns = ['id', 'address', 'weight', 'wasteTypes', 'actions'];
  displayedColumns = ['id', 'address', 'weight', 'actualWeight', 'wasteTypes', 'status', 'actions'];

  constructor(
    private collectionService: CollectionService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMyCollections();
    this.loadAvailableCollections();
  }

  onTabChange(event: any): void {
    if (event.index === 0) {
      this.loadAvailableCollections();
    } else {
      this.loadMyCollections();
    }
  }

  loadAvailableCollections(): void {
    this.collectionService.getAvailableRequests().pipe(
      catchError(error => {
        this.error = 'Failed to load available collections';
        console.error('Error loading available collections:', error);
        return of([]);
      })
    ).subscribe(collections => {
      this.availableCollections = collections;
      this.applyFilter();
      console.log(`Loaded ${collections.length} collections`);
    });
  }

  loadMyCollections(): void {
    this.collectionService.getCollectorRequests().pipe(
      catchError(error => {
        this.error = 'Failed to load your collections';
        console.error('Error loading collector collections:', error);
        return of([]);
      })
    ).subscribe(collections => {
      console.log('Loaded collections:', collections); // Debug log
      this.myCollections = collections;
    });
  }

  applyFilter(): void {
    this.filteredCollections = this.availableCollections.filter(collection => {
      const cityMatch = !this.cityFilter ||
        collection.city.toLowerCase().includes(this.cityFilter.toLowerCase());
      return cityMatch;
    });
    console.log(`Filtered to ${this.filteredCollections.length} collections`);
  }

  clearFilters(): void {
    this.cityFilter = '';
    this.countryFilter = '';
    this.applyFilter();
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'PENDING':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'OCCUPIED':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'IN_PROGRESS':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'VALIDATED':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'REJECTED':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  acceptCollection(id: number): void {
    this.collectionService.updateRequestStatus(id, 'OCCUPIED').pipe(
      catchError(error => {
        this.error = 'Failed to accept collection';
        console.error('Error accepting collection:', error);
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        this.loadAvailableCollections();
        this.loadMyCollections();
      }
    });
  }

  startCollection(id: number): void {
    this.collectionService.updateRequestStatus(id, 'IN_PROGRESS').pipe(
      catchError(error => {
        this.error = 'Failed to start collection';
        console.error('Error starting collection:', error);
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        this.loadMyCollections();
      }
    });
  }

  completeCollection(collection: Collection): void {
    const dialogRef = this.dialog.open(CompleteCollectionDialogComponent, {
      width: '500px',
      data: collection
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('List - Complete request:', {
          collectionId: collection.id,
          dialogResult: result
        });
        this.collectionService.completeCollection(
          collection.id,
          result.actualWeight,  // Now using actualWeight from dialog
          result.photos
        ).pipe(
          catchError(error => {
            const errorMessage = error.error?.message || error.message || 'Unknown error';
            this.error = `Error completing collection: ${errorMessage}`;
            console.error('List - Complete error:', {
              error,
              collection,
              dialogResult: result
            });
            return of(null);
          })
        ).subscribe(response => {
          if (response) {
            console.log('List - Complete success:', response);
            this.loadMyCollections();
          }
        });
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
