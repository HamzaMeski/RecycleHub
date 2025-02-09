import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Collection } from '@shared/types/models';

@Component({
  selector: 'app-complete-collection-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-6">Complete Collection #{{ data.id }}</h2>

      <form [formGroup]="completeForm" (ngSubmit)="onSubmit()">
        <!-- Actual Weight -->
        <mat-form-field class="w-full mb-4">
          <mat-label>Actual Weight (grams)</mat-label>
          <input matInput type="number" formControlName="actualWeight" placeholder="Enter actual weight">
          <mat-hint>Estimated weight was {{ data.weightInGrams }} grams</mat-hint>
          <mat-error *ngIf="completeForm.get('actualWeight')?.hasError('required')">
            Actual weight is required
          </mat-error>
          <mat-error *ngIf="completeForm.get('actualWeight')?.hasError('min')">
            Weight must be greater than 0
          </mat-error>
        </mat-form-field>

        <!-- Photo Upload -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">Collection Photos</label>
          <div class="flex flex-wrap gap-4 mb-2">
            <div *ngFor="let photo of photos" class="relative">
              <img [src]="photo" alt="Collection photo" class="w-32 h-32 object-cover rounded">
              <button type="button" 
                      class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      (click)="removePhoto(photo)">
                ×
              </button>
            </div>
          </div>
          <input type="file" 
                 accept="image/*" 
                 multiple 
                 (change)="onFileSelected($event)"
                 class="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-green-50 file:text-green-700
                        hover:file:bg-green-100">
          <p class="text-sm text-gray-500 mt-1">Upload at least one photo of the collection</p>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-4">
          <button mat-button type="button" (click)="onCancel()">Cancel</button>
          <button mat-raised-button 
                  color="primary" 
                  type="submit" 
                  [disabled]="!completeForm.valid || photos.length === 0">
            Complete Collection
          </button>
        </div>
      </form>
    </div>
  `
})
export class CompleteCollectionDialogComponent {
  completeForm: FormGroup;
  photos: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CompleteCollectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Collection
  ) {
    this.completeForm = this.fb.group({
      actualWeight: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.photos.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removePhoto(photo: string): void {
    this.photos = this.photos.filter(p => p !== photo);
  }

  onSubmit(): void {
    if (this.completeForm.valid && this.photos.length > 0) {
      const result = {
        actualWeight: this.completeForm.value.actualWeight / 1000, // Convert to kg for backend
        photos: this.photos
      };
      this.dialogRef.close(result);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
