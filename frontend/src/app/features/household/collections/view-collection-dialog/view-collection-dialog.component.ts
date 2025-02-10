import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Collection } from '@shared/types/models';

@Component({
  selector: 'app-view-collection-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-6">Collection Details</h2>

      <div class="space-y-4">
        <!-- ID and Status -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Collection ID</p>
            <p class="text-lg font-semibold">#{{ collection.id }}</p>
          </div>
          <span class="px-3 py-1 text-sm rounded-full"
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

        <!-- Address -->
        <div>
          <p class="text-sm text-gray-500">Collection Address</p>
          <p class="text-lg">{{ collection.collectionAddress }}</p>
          <p class="text-md text-gray-600">{{ collection.city }}</p>
        </div>

        <!-- Weight -->
        <div>
          <p class="text-sm text-gray-500">Estimated Weight</p>
          <p class="text-lg">{{ collection.weightInGrams / 1000 }} kg</p>
        </div>

        <!-- Waste Types -->
        <div>
          <p class="text-sm text-gray-500 mb-2">Waste Types</p>
          <div class="flex flex-wrap gap-2">
            <span *ngFor="let type of collection.wasteTypes" 
                  class="px-3 py-1 text-sm rounded-full"
                  [ngClass]="{
                    'bg-blue-100 text-blue-800': type === 'PLASTIC',
                    'bg-green-100 text-green-800': type === 'PAPER',
                    'bg-purple-100 text-purple-800': type === 'GLASS',
                    'bg-yellow-100 text-yellow-800': type === 'METAL'
                  }">
              {{ type }}
            </span>
          </div>
        </div>

        <!-- Notes -->
        <div *ngIf="collection.notes">
          <p class="text-sm text-gray-500">Notes</p>
          <p class="text-lg">{{ collection.notes }}</p>
        </div>

        <!-- Timestamps -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500">Created At</p>
            <p class="text-md">{{ collection.createdAt | date:'medium' }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Last Updated</p>
            <p class="text-md">{{ collection.updatedAt | date:'medium' }}</p>
          </div>
        </div>

        <!-- Close Button -->
        <div class="flex justify-end mt-6">
          <button mat-button color="primary" (click)="close()">Close</button>
        </div>
      </div>
    </div>
  `
})
export class ViewCollectionDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public collection: Collection,
    private dialogRef: MatDialogRef<ViewCollectionDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
