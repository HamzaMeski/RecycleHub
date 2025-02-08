import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardLayoutComponent } from '@shared/components/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-collection-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DashboardLayoutComponent],
  template: `
    <app-dashboard-layout
      sectionTitle="New Collection Request"
      [sidebarLinks]="sidebarLinks"
    >
      <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-lg shadow p-6">
          <h1 class="text-2xl font-bold text-gray-800 mb-6">Create Collection Request</h1>
          
          <form [formGroup]="collectionForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Waste Types -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Waste Types
              </label>
              <div class="grid grid-cols-2 gap-4">
                <div *ngFor="let type of wasteTypes" class="flex items-center">
                  <input
                    type="checkbox"
                    [id]="type.value"
                    [value]="type.value"
                    (change)="onWasteTypeChange($event)"
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  >
                  <label [for]="type.value" class="ml-2 block text-sm text-gray-900">
                    {{ type.label }}
                  </label>
                </div>
              </div>
            </div>

            <!-- Weight -->
            <div>
              <label for="weight" class="block text-sm font-medium text-gray-700 mb-2">
                Estimated Weight (in grams)
              </label>
              <input
                type="number"
                id="weight"
                formControlName="weightInGrams"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter weight in grams"
              >
              <p *ngIf="collectionForm.get('weightInGrams')?.errors?.['required'] && collectionForm.get('weightInGrams')?.touched"
                 class="mt-1 text-sm text-red-600">
                Weight is required
              </p>
            </div>

            <!-- Collection Address -->
            <div>
              <label for="address" class="block text-sm font-medium text-gray-700 mb-2">
                Collection Address
              </label>
              <input
                type="text"
                id="address"
                formControlName="collectionAddress"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter collection address"
              >
              <p *ngIf="collectionForm.get('collectionAddress')?.errors?.['required'] && collectionForm.get('collectionAddress')?.touched"
                 class="mt-1 text-sm text-red-600">
                Collection address is required
              </p>
            </div>

            <!-- City -->
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                formControlName="city"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter city"
              >
              <p *ngIf="collectionForm.get('city')?.errors?.['required'] && collectionForm.get('city')?.touched"
                 class="mt-1 text-sm text-red-600">
                City is required
              </p>
            </div>

            <!-- Notes -->
            <div>
              <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                formControlName="notes"
                rows="3"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Any special instructions or notes"
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
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" multiple (change)="onFileSelected($event)">
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end">
              <button
                type="submit"
                [disabled]="!collectionForm.valid"
                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Create Collection Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </app-dashboard-layout>
  `
})
export class CollectionFormComponent {
  sidebarLinks = [
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>',
      label: 'Dashboard',
      route: '/household'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>',
      label: 'New Collection',
      route: '/household/collections/new'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>',
      label: 'My Collections',
      route: '/household/collections'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
      label: 'Points & Rewards',
      route: '/household/rewards'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',
      label: 'Profile',
      route: '/household/profile'
    }
  ];

  collectionForm: FormGroup;
  selectedWasteTypes: string[] = [];
  selectedFiles: File[] = [];

  wasteTypes = [
    { value: 'PLASTIC', label: 'Plastic' },
    { value: 'PAPER', label: 'Paper' },
    { value: 'GLASS', label: 'Glass' },
    { value: 'METAL', label: 'Metal' },
    { value: 'ELECTRONICS', label: 'Electronics' },
    { value: 'ORGANIC', label: 'Organic' }
  ];

  constructor(private fb: FormBuilder) {
    this.collectionForm = this.fb.group({
      weightInGrams: ['', [Validators.required, Validators.min(1)]],
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
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    this.selectedFiles = Array.from(files);
  }

  onSubmit() {
    if (this.collectionForm.valid && this.selectedWasteTypes.length > 0) {
      const formData = {
        ...this.collectionForm.value,
        wasteTypes: this.selectedWasteTypes,
        photos: this.selectedFiles
      };
      
      console.log('Form submitted:', formData);
      // TODO: Implement API call to create collection request
    }
  }
}
