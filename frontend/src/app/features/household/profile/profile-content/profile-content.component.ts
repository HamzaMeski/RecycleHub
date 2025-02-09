import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService, ProfileResponse, ProfileUpdateRequest } from '@core/services/profile.service';
import { Store } from '@ngrx/store';
import { AppState } from '@store/index';

@Component({
  selector: 'app-profile-content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>

        <!-- Success Message -->
        <div *ngIf="successMessage" class="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
          {{ successMessage }}
        </div>

        <!-- Error Message -->
        <div *ngIf="error" class="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {{ error }}
        </div>

        <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- First Name -->
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              formControlName="firstName"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              [class.border-red-300]="profileForm.get('firstName')?.invalid && profileForm.get('firstName')?.touched"
            >
            <p *ngIf="profileForm.get('firstName')?.invalid && profileForm.get('firstName')?.touched" class="mt-1 text-sm text-red-600">
              First name is required
            </p>
          </div>

          <!-- Last Name -->
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              formControlName="lastName"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              [class.border-red-300]="profileForm.get('lastName')?.invalid && profileForm.get('lastName')?.touched"
            >
            <p *ngIf="profileForm.get('lastName')?.invalid && profileForm.get('lastName')?.touched" class="mt-1 text-sm text-red-600">
              Last name is required
            </p>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              [class.border-red-300]="profileForm.get('email')?.invalid && profileForm.get('email')?.touched"
            >
            <p *ngIf="profileForm.get('email')?.invalid && profileForm.get('email')?.touched" class="mt-1 text-sm text-red-600">
              Please enter a valid email address
            </p>
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              formControlName="phone"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              [class.border-red-300]="profileForm.get('phone')?.invalid && profileForm.get('phone')?.touched"
            >
            <p *ngIf="profileForm.get('phone')?.invalid && profileForm.get('phone')?.touched" class="mt-1 text-sm text-red-600">
              Please enter a valid phone number
            </p>
          </div>

          <!-- Date of Birth -->
          <div>
            <label for="dateOfBirth" class="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              formControlName="dateOfBirth"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              [class.border-red-300]="profileForm.get('dateOfBirth')?.invalid && profileForm.get('dateOfBirth')?.touched"
            >
            <p *ngIf="profileForm.get('dateOfBirth')?.invalid && profileForm.get('dateOfBirth')?.touched" class="mt-1 text-sm text-red-600">
              Date of birth is required
            </p>
          </div>

          <!-- Street -->
          <div>
            <label for="street" class="block text-sm font-medium text-gray-700">Street Address</label>
            <input
              type="text"
              id="street"
              formControlName="street"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              [class.border-red-300]="profileForm.get('street')?.invalid && profileForm.get('street')?.touched"
            >
            <p *ngIf="profileForm.get('street')?.invalid && profileForm.get('street')?.touched" class="mt-1 text-sm text-red-600">
              Street address is required
            </p>
          </div>

          <!-- City -->
          <div>
            <label for="city" class="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              formControlName="city"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              [class.border-red-300]="profileForm.get('city')?.invalid && profileForm.get('city')?.touched"
            >
            <p *ngIf="profileForm.get('city')?.invalid && profileForm.get('city')?.touched" class="mt-1 text-sm text-red-600">
              City is required
            </p>
          </div>

          <!-- Country -->
          <div>
            <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              id="country"
              formControlName="country"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              [class.border-red-300]="profileForm.get('country')?.invalid && profileForm.get('country')?.touched"
            >
            <p *ngIf="profileForm.get('country')?.invalid && profileForm.get('country')?.touched" class="mt-1 text-sm text-red-600">
              Country is required
            </p>
          </div>

          <!-- Zip Code -->
          <div>
            <label for="zipCode" class="block text-sm font-medium text-gray-700">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              formControlName="zipCode"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              [class.border-red-300]="profileForm.get('zipCode')?.invalid && profileForm.get('zipCode')?.touched"
            >
            <p *ngIf="profileForm.get('zipCode')?.invalid && profileForm.get('zipCode')?.touched" class="mt-1 text-sm text-red-600">
              Zip code is required
            </p>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <button
              type="submit"
              [disabled]="profileForm.invalid || isSubmitting"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ProfileContentComponent implements OnInit {
  profileForm: FormGroup;
  isSubmitting = false;
  successMessage: string | null = null;
  error: string | null = null;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private store: Store<AppState>
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Get user ID from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.userId = user.userId;
      this.loadProfile();
    }
  }

  loadProfile() {
    if (this.userId) {
      this.profileService.getProfile(this.userId).subscribe({
        next: (profile: ProfileResponse) => {
          this.profileForm.patchValue({
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            phone: profile.phone,
            dateOfBirth: new Date(profile.dateOfBirth).toISOString().split('T')[0],
            street: profile.street,
            city: profile.city,
            country: profile.country,
            zipCode: profile.zipCode
          });
        },
        error: (err) => {
          this.error = 'Failed to load profile data. Please try again.';
          console.error('Error loading profile:', err);
        }
      });
    }
  }

  onSubmit() {
    if (this.profileForm.valid && this.userId) {
      this.isSubmitting = true;
      this.error = null;
      this.successMessage = null;

      const profileData: ProfileUpdateRequest = {
        ...this.profileForm.value,
        dateOfBirth: new Date(this.profileForm.value.dateOfBirth)
      };

      this.profileService.updateProfile(this.userId, profileData).subscribe({
        next: () => {
          this.successMessage = 'Profile updated successfully!';
          this.isSubmitting = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to update profile. Please try again.';
          this.isSubmitting = false;
          console.error('Error updating profile:', err);
        }
      });
    }
  }
}
