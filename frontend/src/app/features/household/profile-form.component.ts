import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService, ProfileResponse, ProfileUpdateRequest } from '@core/services/profile.service';
import { Store } from '@ngrx/store';
import { AppState } from '@store/index';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-6">Profile Information</h2>
      
      <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Personal Information -->
          <div>
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              formControlName="firstName"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              formControlName="lastName"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              formControlName="email"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              formControlName="phone"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              formControlName="dateOfBirth"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <!-- Address Information -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Street</label>
            <input
              type="text"
              formControlName="street"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              formControlName="city"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              formControlName="country"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Zip Code</label>
            <input
              type="text"
              formControlName="zipCode"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            [disabled]="!profileForm.valid || profileForm.pristine"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  `
})
export class ProfileFormComponent implements OnInit {
  profileForm: FormGroup;
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
      zipCode: ['', Validators.required],
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
        next: (profile) => {
          this.profileForm.patchValue({
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            phone: profile.phone,
            dateOfBirth: new Date(profile.dateOfBirth).toISOString().split('T')[0],
            street: profile.street,
            city: profile.city,
            country: profile.country,
            zipCode: profile.zipCode,
          });
        },
        error: (error) => {
          console.error('Error loading profile:', error);
          // Handle error (show notification, etc.)
        }
      });
    }
  }

  onSubmit() {
    if (this.profileForm.valid && this.userId) {
      const updateRequest: ProfileUpdateRequest = this.profileForm.value;
      this.profileService.updateProfile(this.userId, updateRequest).subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          // Handle success (show notification, etc.)
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          // Handle error (show notification, etc.)
        }
      });
    }
  }
}
