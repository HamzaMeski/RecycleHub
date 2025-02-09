import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule, MatCheckboxChange } from '@angular/material/checkbox';
import { Collection } from '@shared/types/models';
import { WasteType } from '@shared/types/enums';

interface DialogData {
  type: 'view' | 'edit';
  collection: Collection;
}

@Component({
  selector: 'app-collection-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  template: `
    <div class="p-6">
      <h2 mat-dialog-title class="text-2xl font-bold mb-4">
        {{ data.type === 'view' ? 'Collection Details' : 'Edit Collection' }}
      </h2>

      <mat-dialog-content>
        <!-- View Mode -->
        <div *ngIf="data.type === 'view'" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Status</p>
              <p class="font-medium">{{ data.collection.status }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Created At</p>
              <p class="font-medium">{{ data.collection.createdAt | date:'medium' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Address</p>
              <p class="font-medium">{{ data.collection.collectionAddress }}, {{ data.collection.city }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Weight</p>
              <p class="font-medium">{{ data.collection.weightInGrams / 1000 }} kg</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Points</p>
              <p class="font-medium">{{ data.collection.points || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Waste Types</p>
              <div class="flex flex-wrap gap-2">
                <span 
                  *ngFor="let type of data.collection.wasteTypes"
                  class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
                >
                  {{ type }}
                </span>
              </div>
            </div>
            <div *ngIf="data.collection.notes" class="col-span-2">
              <p class="text-sm text-gray-500">Notes</p>
              <p class="font-medium">{{ data.collection.notes }}</p>
            </div>
          </div>
        </div>

        <!-- Edit Mode -->
        <form *ngIf="data.type === 'edit'" [formGroup]="editForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
              <mat-form-field class="w-full">
                <mat-label>Collection Address</mat-label>
                <input matInput formControlName="collectionAddress" />
              </mat-form-field>
            </div>

            <div>
              <mat-form-field class="w-full">
                <mat-label>City</mat-label>
                <input matInput formControlName="city" />
              </mat-form-field>
            </div>

            <div>
              <mat-form-field class="w-full">
                <mat-label>Weight (kg)</mat-label>
                <input matInput type="number" formControlName="weightInGrams" />
              </mat-form-field>
            </div>

            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Waste Types</label>
              <div class="grid grid-cols-3 gap-2">
                <mat-checkbox
                  *ngFor="let type of wasteTypes"
                  [checked]="isWasteTypeSelected(type)"
                  (change)="onWasteTypeChange($event, type)"
                  color="primary"
                >
                  {{ type }}
                </mat-checkbox>
              </div>
            </div>

            <div class="col-span-2">
              <mat-form-field class="w-full">
                <mat-label>Notes</mat-label>
                <textarea matInput formControlName="notes" rows="3"></textarea>
              </mat-form-field>
            </div>
          </div>
        </form>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="mt-6">
        <button
          mat-button
          (click)="onCancel()"
          class="mr-2"
        >
          {{ data.type === 'view' ? 'Close' : 'Cancel' }}
        </button>
        <button
          *ngIf="data.type === 'edit'"
          mat-raised-button
          color="primary"
          (click)="onSave()"
          [disabled]="!editForm.valid"
          class="bg-green-600 text-white"
        >
          Save Changes
        </button>
      </mat-dialog-actions>
    </div>
  `
})
export class CollectionDialogComponent {
  editForm!: FormGroup;
  wasteTypes = Object.values(WasteType);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CollectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    if (data.type === 'edit') {
      this.editForm = this.fb.group({
        collectionAddress: [data.collection.collectionAddress, Validators.required],
        city: [data.collection.city, Validators.required],
        weightInGrams: [data.collection.weightInGrams / 1000, [Validators.required, Validators.min(0.1)]],
        notes: [data.collection.notes]
      });
    }
  }

  isWasteTypeSelected(type: string): boolean {
    return this.data.collection.wasteTypes.includes(type as WasteType);
  }

  onWasteTypeChange(event: MatCheckboxChange, type: string): void {
    const currentTypes = new Set(this.data.collection.wasteTypes);

    if (event.checked) {
      currentTypes.add(type as WasteType);
    } else {
      currentTypes.delete(type as WasteType);
    }

    this.data.collection.wasteTypes = Array.from(currentTypes);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.editForm.valid) {
      const formValue = this.editForm.value;
      const updatedCollection: Partial<Collection> = {
        ...formValue,
        weightInGrams: Math.round(formValue.weightInGrams * 1000), // Convert kg to grams
        wasteTypes: this.data.collection.wasteTypes
      };
      this.dialogRef.close(updatedCollection);
    }
  }
}
