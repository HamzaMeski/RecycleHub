import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CollectionService } from '@core/services/collection.service';
import { Collection } from '@shared/types/models';
import { CollectionStatus } from '@shared/types/enums';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CollectionDialogComponent } from '../collection-dialog/collection-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-collection-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">My Collections</h1>
        <a
          routerLink="/household/collections/new"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          New Collection
        </a>
      </div>

      <!-- Error Message -->
      <div *ngIf="error" class="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {{ error }}
      </div>

      <!-- Filters -->
      <div class="bg-white p-4 rounded-lg shadow mb-6">
        <div class="flex gap-4">
          <button
            *ngFor="let status of collectionStatuses"
            (click)="filterByStatus(status)"
            [class.bg-green-600]="selectedStatus === status"
            [class.text-white]="selectedStatus === status"
            [class.bg-gray-100]="selectedStatus !== status"
            class="px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {{ status }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>

      <!-- Collections Table -->
      <div *ngIf="!loading" class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let collection of filteredCollections">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ collection.createdAt | date:'medium' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span [class]="getStatusClass(collection.status)">
                  {{ collection.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ collection.collectionAddress }}, {{ collection.city }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ collection.weightInGrams / 1000 }} kg
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ collection.points || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex gap-2">
                  <button
                    *ngIf="collection.status === CollectionStatus.PENDING"
                    mat-icon-button
                    color="primary"
                    (click)="editCollection(collection)"
                    matTooltip="Edit Collection"
                  >
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button
                    *ngIf="collection.status === CollectionStatus.PENDING"
                    mat-icon-button
                    color="warn"
                    (click)="cancelCollection(collection.id)"
                    matTooltip="Cancel Collection"
                  >
                    <mat-icon>delete</mat-icon>
                  </button>
                  <button
                    mat-icon-button
                    color="accent"
                    (click)="viewCollection(collection)"
                    matTooltip="View Details"
                  >
                    <mat-icon>visibility</mat-icon>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr *ngIf="filteredCollections.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                No collection requests found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class CollectionListComponent implements OnInit {
  collections: Collection[] = [];
  filteredCollections: Collection[] = [];
  selectedStatus: string = 'All';
  loading = false;
  error: string | null = null;
  CollectionStatus = CollectionStatus;

  collectionStatuses = ['All', ...Object.values(CollectionStatus)];

  constructor(
    private collectionService: CollectionService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadCollections();
  }

  loadCollections() {
    this.loading = true;
    this.collectionService.getCollections().subscribe({
      next: (collections) => {
        this.collections = collections;
        this.filterByStatus(this.selectedStatus);
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load collections';
        this.loading = false;
      }
    });
  }

  filterByStatus(status: string) {
    this.selectedStatus = status;
    if (status === 'All') {
      this.filteredCollections = this.collections;
    } else {
      this.filteredCollections = this.collections.filter(c => c.status === status);
    }
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
    switch (status) {
      case CollectionStatus.PENDING:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case CollectionStatus.OCCUPIED:
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case CollectionStatus.IN_PROGRESS:
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case CollectionStatus.VALIDATED:
        return `${baseClasses} bg-green-100 text-green-800`;
      case CollectionStatus.REJECTED:
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  viewCollection(collection: Collection) {
    this.dialog.open(CollectionDialogComponent, {
      width: '600px',
      data: {
        type: 'view',
        collection
      }
    });
  }

  editCollection(collection: Collection) {
    const dialogRef = this.dialog.open(CollectionDialogComponent, {
      width: '600px',
      data: {
        type: 'edit',
        collection: { ...collection }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.collectionService.updateCollection(collection.id, result).subscribe({
          next: (updatedCollection) => {
            const index = this.collections.findIndex(c => c.id === collection.id);
            if (index !== -1) {
              this.collections[index] = updatedCollection;
              this.filterByStatus(this.selectedStatus);
            }
            this.loading = false;
          },
          error: (err) => {
            this.error = err.message || 'Failed to update collection';
            this.loading = false;
          }
        });
      }
    });
  }

  cancelCollection(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Cancel Collection',
        message: 'Are you sure you want to cancel this collection request? This action cannot be undone.',
        confirmText: 'Cancel Collection',
        cancelText: 'Keep Collection',
        isDestructive: true
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.loading = true;
        this.collectionService.cancelCollection(id).subscribe({
          next: () => {
            this.collections = this.collections.filter(c => c.id !== id);
            this.filterByStatus(this.selectedStatus);
            this.loading = false;
          },
          error: (err) => {
            this.error = err.message || 'Failed to cancel collection';
            this.loading = false;
          }
        });
      }
    });
  }
}
