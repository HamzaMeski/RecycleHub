import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CollectionService } from '@core/services/collection.service';
import { CollectionRequestDTO } from '@shared/models/collection.model';
import { WasteType } from '@shared/models/waste-type.enum';

@Component({
  selector: 'app-collection-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Create Collection Request</h1>

        <!-- Success Message -->
        <div *ngIf="successMessage" class="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
          {{ successMessage }}
        </div>

        <!-- Error Message -->
        <div *ngIf="error" class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {{ error }}
        </div>

        <form [formGroup]="collectionForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Waste Types -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Waste Types*
            </label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div *ngFor="let type of wasteTypes" class="flex items-center">
                <input
                  type="checkbox"
                  [id]="type.value"
                  [value]="type.value"
                  (change)="onWasteTypeChange($event)"
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label [for]="type.value" class="ml-2 block text-sm text-gray-900">
                  {{ type.label }}
                </label>
              </div>
            </div>
            <p *ngIf="showWasteTypeError" class="mt-1 text-sm text-red-600">
              Please select at least one waste type
            </p>
          </div>

          <!-- Weight -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Weight (in grams)*
            </label>
            <input
              type="number"
              formControlName="weightInGrams"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter weight in grams"
            />
            <p *ngIf="collectionForm.get('weightInGrams')?.errors?.['required'] && collectionForm.get('weightInGrams')?.touched"
               class="mt-1 text-sm text-red-600">
              Weight is required
            </p>
            <p *ngIf="collectionForm.get('weightInGrams')?.errors?.['min'] && collectionForm.get('weightInGrams')?.touched"
               class="mt-1 text-sm text-red-600">
              Weight must be at least 1000 grams
            </p>
            <p *ngIf="collectionForm.get('weightInGrams')?.errors?.['max'] && collectionForm.get('weightInGrams')?.touched"
               class="mt-1 text-sm text-red-600">
              Weight cannot exceed 10000 grams (10 kg)
            </p>
          </div>

          <!-- Collection Address -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Collection Address*
            </label>
            <input
              type="text"
              formControlName="collectionAddress"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter collection address"
            />
            <p *ngIf="collectionForm.get('collectionAddress')?.errors?.['required'] && collectionForm.get('collectionAddress')?.touched"
               class="mt-1 text-sm text-red-600">
              Collection address is required
            </p>
          </div>

          <!-- City -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              City*
            </label>
            <input
              type="text"
              formControlName="city"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter city"
            />
            <p *ngIf="collectionForm.get('city')?.errors?.['required'] && collectionForm.get('city')?.touched"
               class="mt-1 text-sm text-red-600">
              City is required
            </p>
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              formControlName="notes"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Add any additional notes"
            ></textarea>
          </div>

          <!-- Photos -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Photos
            </label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                  >
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      type="file"
                      class="sr-only"
                      multiple
                      (change)="onFileSelected($event)"
                      accept="image/*"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>
            <!-- Selected Files Preview -->
            <div *ngIf="selectedFiles.length > 0" class="mt-4">
              <h4 class="text-sm font-medium text-gray-700">Selected Files:</h4>
              <ul class="mt-2 divide-y divide-gray-200">
                <li *ngFor="let file of selectedFiles; let i = index" class="py-2 flex justify-between items-center">
                  <span class="text-sm text-gray-600">{{ file.name }}</span>
                  <button
                    type="button"
                    (click)="removeFile(i)"
                    class="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <button
              type="submit"
              [disabled]="!collectionForm.valid || selectedWasteTypes.length === 0 || isSubmitting"
              class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span *ngIf="isSubmitting" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              Create Collection Request
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class CollectionFormComponent implements OnInit {
  collectionForm!: FormGroup;
  selectedWasteTypes: WasteType[] = [];
  selectedFiles: File[] = [];
  showWasteTypeError = false;
  isSubmitting = false;
  error: string | null = null;
  successMessage: string | null = null;

  wasteTypes = [
    { value: WasteType.PLASTIC, label: 'Plastic' },
    { value: WasteType.PAPER, label: 'Paper' },
    { value: WasteType.GLASS, label: 'Glass' },
    { value: WasteType.METAL, label: 'Metal' }
  ];

  constructor(
    private fb: FormBuilder,
    private collectionService: CollectionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.collectionForm = this.fb.group({
      weightInGrams: ['', [Validators.required, Validators.min(1000), Validators.max(10000)]],
      collectionAddress: ['', Validators.required],
      city: ['', Validators.required],
      notes: ['']
    });
  }

  onWasteTypeChange(event: any) {
    const value = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      this.selectedWasteTypes.push(value);
    } else {
      const index = this.selectedWasteTypes.indexOf(value);
      if (index > -1) {
        this.selectedWasteTypes.splice(index, 1);
      }
    }
    this.showWasteTypeError = false;
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  async onSubmit() {
    if (this.collectionForm.valid) {
      if (this.selectedWasteTypes.length === 0) {
        this.showWasteTypeError = true;
        return;
      }

      this.isSubmitting = true;
      this.error = null;
      this.successMessage = null;

      try {
        const formData: CollectionRequestDTO = {
          ...this.collectionForm.value,
          wasteTypes: this.selectedWasteTypes
        };

        await this.collectionService.createCollection(formData).toPromise();
        this.successMessage = 'Collection request created successfully!';
        this.collectionForm.reset();
        this.selectedWasteTypes = [];
        this.selectedFiles = [];
      } catch (error: any) {
        this.error = error.error?.message || 'Failed to create collection request. Please try again.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
