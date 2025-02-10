import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { Collection } from '@shared/types/models';
import { CollectionService } from '@core/services/collection.service';

@Component({
  selector: 'app-edit-collection-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule
  ],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-6">{{ isEdit ? 'Edit' : 'New' }} Collection Request x</h2>

      <form [formGroup]="collectionForm" (ngSubmit)="onSubmit()">
        <!-- Address -->
        <mat-form-field class="w-full mb-4">
          <mat-label>Collection Address</mat-label>
          <input matInput formControlName="collectionAddress" placeholder="Enter collection address">
          <mat-error *ngIf="collectionForm.get('collectionAddress')?.hasError('required')">
            Address is required
          </mat-error>
        </mat-form-field>

        <!-- City -->
        <mat-form-field class="w-full mb-4">
          <mat-label>City</mat-label>
          <input matInput formControlName="city" placeholder="Enter city">
          <mat-error *ngIf="collectionForm.get('city')?.hasError('required')">
            City is required
          </mat-error>
        </mat-form-field>

        <!-- Weight -->
        <mat-form-field class="w-full mb-4">
          <mat-label>Estimated Weight (kg)</mat-label>
          <input matInput type="number" formControlName="weightInGrams" placeholder="Enter estimated weight">
          <mat-error *ngIf="collectionForm.get('weightInGrams')?.hasError('required')">
            Weight is required
          </mat-error>
          <mat-error *ngIf="collectionForm.get('weightInGrams')?.hasError('min')">
            Weight must be greater than 0
          </mat-error>
        </mat-form-field>

        <!-- Waste Types -->
        <mat-form-field class="w-full mb-4">
          <mat-label>Waste Types</mat-label>
          <mat-select formControlName="wasteTypes" multiple>
            <mat-option value="PLASTIC">Plastic</mat-option>
            <mat-option value="PAPER">Paper</mat-option>
            <mat-option value="GLASS">Glass</mat-option>
            <mat-option value="METAL">Metal</mat-option>
          </mat-select>
          <mat-error *ngIf="collectionForm.get('wasteTypes')?.hasError('required')">
            Please select at least one waste type
          </mat-error>
        </mat-form-field>

        <!-- Notes -->
        <mat-form-field class="w-full mb-6">
          <mat-label>Notes</mat-label>
          <textarea matInput formControlName="notes" placeholder="Add any additional notes"></textarea>
        </mat-form-field>

        <!-- Actions -->
        <div class="flex justify-end gap-4">
          <button mat-button type="button" (click)="onCancel()">Cancel</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="!collectionForm.valid">
            {{ isEdit ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class EditCollectionDialogComponent implements OnInit {
  collectionForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCollectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Collection | null,
    private collectionService: CollectionService
  ) {
    this.collectionForm = this.fb.group({
      collectionAddress: ['', Validators.required],
      city: ['', Validators.required],
      weightInGrams: ['', [Validators.required, Validators.min(0)]],
      wasteTypes: [[], Validators.required],
      notes: ['']
    });

    if (data) {
      this.isEdit = true;
      this.collectionForm.patchValue({
        collectionAddress: data.collectionAddress,
        city: data.city,
        weightInGrams: data.weightInGrams / 1000, // Convert to kg for display
        wasteTypes: data.wasteTypes,
        notes: data.notes
      });
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.collectionForm.valid) {
      const formValue = this.collectionForm.value;
      const request = {
        ...formValue,
        weightInGrams: formValue.weightInGrams * 1000 // Convert kg to grams
      };

      if (this.isEdit && this.data) {
        this.collectionService.updateRequest(this.data.id, request)
          .subscribe({
            next: (updatedCollection) => {
              console.log('Collection updated:', updatedCollection);
              this.dialogRef.close(true);
            },
            error: (error) => {
              console.error('Error updating collection:', error);
              // Handle error appropriately
            }
          });
      } else {
        this.collectionService.createRequest(request)
          .subscribe({
            next: (newCollection) => {
              console.log('Collection created:', newCollection);
              this.dialogRef.close(true);
            },
            error: (error) => {
              console.error('Error creating collection:', error);
              // Handle error appropriately
            }
          });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
