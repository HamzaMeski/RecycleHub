import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Collection } from '@shared/types/models';

@Component({
  selector: 'app-delete-collection-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="p-6">
      <div class="text-center">
        <!-- Warning Icon -->
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <mat-icon class="text-red-600">warning</mat-icon>
        </div>

        <!-- Title -->
        <h3 class="text-lg font-medium text-gray-900 mb-2">Delete Collection</h3>

        <!-- Message -->
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            Are you sure you want to delete collection #{{ collection.id }}?
            This action cannot be undone.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 flex justify-end gap-3">
          <button mat-button
                  (click)="onCancel()"
                  class="!text-gray-700">
            Cancel
          </button>
          <button mat-raised-button
                  color="warn"
                  (click)="onConfirm()"
                  class="!bg-red-600">
            Delete Collection
          </button>
        </div>
      </div>
    </div>
  `
})
export class DeleteCollectionDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public collection: Collection,
    private dialogRef: MatDialogRef<DeleteCollectionDialogComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
