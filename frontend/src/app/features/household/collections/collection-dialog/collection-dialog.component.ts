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
              <p class="font-medium">{{ data.collection.weightInGrams }} g</p>
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
            <!-- Waste Types -->
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Waste Types*
              </label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div *ngFor="let type of wasteTypes" class="flex items-center">
                  <mat-checkbox
                    [checked]="isWasteTypeSelected(type.value)"
                    (change)="onWasteTypeChange($event, type.value)"
                    color="primary"
                  >
                    {{ type.label }}
                  </mat-checkbox>
                </div>
              </div>
              <p *ngIf="showWasteTypeError" class="mt-1 text-sm text-red-600">
                Please select at least one waste type
              </p>
            </div>

            <!-- Weight -->
            <div class="col-span-2">
              <mat-form-field class="w-full">
                <mat-label>Weight (in grams)*</mat-label>
                <input
                  matInput
                  type="number"
                  formControlName="weightInGrams"
                  placeholder="Enter weight in grams"
                />
                <mat-error *ngIf="editForm.get('weightInGrams')?.errors?.['required']">
                  Weight is required
                </mat-error>
                <mat-error *ngIf="editForm.get('weightInGrams')?.errors?.['min']">
                  Weight must be at least 1000 grams
                </mat-error>
                <mat-error *ngIf="editForm.get('weightInGrams')?.errors?.['max']">
                  Weight cannot exceed 10000 grams (10 kg)
                </mat-error>
              </mat-form-field>
            </div>

            <!-- Collection Address -->
            <div class="col-span-2">
              <mat-form-field class="w-full">
                <mat-label>Collection Address*</mat-label>
                <input
                  matInput
                  formControlName="collectionAddress"
                  placeholder="Enter collection address"
                />
                <mat-error *ngIf="editForm.get('collectionAddress')?.errors?.['required']">
                  Collection address is required
                </mat-error>
              </mat-form-field>
            </div>

            <!-- City -->
            <div class="col-span-2">
              <mat-form-field class="w-full">
                <mat-label>City*</mat-label>
                <input
                  matInput
                  formControlName="city"
                  placeholder="Enter city"
                />
                <mat-error *ngIf="editForm.get('city')?.errors?.['required']">
                  City is required
                </mat-error>
              </mat-form-field>
            </div>

            <!-- Notes -->
            <div class="col-span-2">
              <mat-form-field class="w-full">
                <mat-label>Notes</mat-label>
                <textarea
                  matInput
                  formControlName="notes"
                  rows="3"
                  placeholder="Add any additional notes"
                ></textarea>
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
          [disabled]="!isValid()"
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
  showWasteTypeError = false;
  selectedWasteTypes: WasteType[] = [];
  wasteTypes = [
    { value: WasteType.PLASTIC, label: 'Plastic' },
    { value: WasteType.PAPER, label: 'Paper' },
    { value: WasteType.GLASS, label: 'Glass' },
    { value: WasteType.METAL, label: 'Metal' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CollectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    if (data.type === 'edit') {
      this.selectedWasteTypes = [...data.collection.wasteTypes];
      this.editForm = this.fb.group({
        weightInGrams: [data.collection.weightInGrams, [Validators.required, Validators.min(1000), Validators.max(10000)]],
        collectionAddress: [data.collection.collectionAddress, Validators.required],
        city: [data.collection.city, Validators.required],
        notes: [data.collection.notes]
      });
    }
  }

  isWasteTypeSelected(type: string): boolean {
    return this.selectedWasteTypes.includes(type as WasteType);
  }

  onWasteTypeChange(event: MatCheckboxChange, type: string): void {
    const currentTypes = new Set(this.selectedWasteTypes);

    if (event.checked) {
      currentTypes.add(type as WasteType);
    } else {
      currentTypes.delete(type as WasteType);
    }

    this.selectedWasteTypes = Array.from(currentTypes);
    this.showWasteTypeError = false;
  }

  isValid(): boolean {
    return this.editForm.valid && this.selectedWasteTypes.length > 0;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.isValid()) {
      if (this.selectedWasteTypes.length === 0) {
        this.showWasteTypeError = true;
        return;
      }

      const formValue = this.editForm.value;
      const updatedCollection = {
        ...formValue,
        wasteTypes: this.selectedWasteTypes
      };
      this.dialogRef.close(updatedCollection);
    }
  }
}
