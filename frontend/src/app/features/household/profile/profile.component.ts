import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService, ProfileResponse } from '@core/services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="px-6 py-4 bg-green-600">
        <h2 class="text-xl font-bold text-white">Profile Information</h2>
      </div>
      
      <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Personal Information Section -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-700">Personal Information</h3>
            
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
          </div>

          <!-- Address Information Section -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-700">Address Information</h3>
            
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
        </div>

        <!-- Points Display -->
        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <p class="text-lg font-semibold text-gray-700">
            Recycling Points: <span class="text-green-600">{{ points }}</span>
          </p>
        </div>

        <!-- Submit Button -->
        <div class="mt-6 flex justify-end">
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
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  points: number = 0;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    @Inject(PLATFORM_ID) private platformId: Object
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
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        this.userId = user.userId;
        this.loadProfile();
      }
    }
  }

  loadProfile() {
    if (this.userId) {
      this.profileService.getProfile(this.userId).subscribe({
        next: (profile: ProfileResponse) => {
          this.points = profile.points;
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
        error: (error) => {
          console.error('Error loading profile:', error);
          // TODO: Add error notification
        }
      });
    }
  }

  onSubmit() {
    if (this.profileForm.valid && this.userId) {
      this.profileService.updateProfile(this.userId, this.profileForm.value).subscribe({
        next: (response: ProfileResponse) => {
          this.points = response.points;
          // TODO: Add success notification
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          // TODO: Add error notification
        }
      });
    }
  }
}
