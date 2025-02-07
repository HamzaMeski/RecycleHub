import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { registerHouseHold } from '@store/actions/auth.actions';
import { AppState } from '@store/index';
import { selectAuthError, selectAuthLoading } from '@store/selectors/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your household account
          </h2>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <!-- Personal Information -->
          <div class="rounded-md shadow-sm -space-y-px">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="sr-only">First Name</label>
                <input formControlName="firstName" type="text"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First Name">
              </div>
              <div>
                <label for="lastName" class="sr-only">Last Name</label>
                <input formControlName="lastName" type="text"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name">
              </div>
            </div>

            <div>
              <label for="email" class="sr-only">Email address</label>
              <input formControlName="email" type="email"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address">
            </div>

            <div>
              <label for="password" class="sr-only">Password</label>
              <input formControlName="password" type="password"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password">
            </div>

            <div>
              <label for="phone" class="sr-only">Phone</label>
              <input formControlName="phone" type="tel"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone">
            </div>

            <div>
              <label for="dateOfBirth" class="sr-only">Date of Birth</label>
              <input formControlName="dateOfBirth" type="date"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
            </div>
          </div>

          <!-- Address Information -->
          <div class="rounded-md shadow-sm -space-y-px mt-4">
            <div>
              <label for="street" class="sr-only">Street</label>
              <input formControlName="street" type="text"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Street">
            </div>

            <div>
              <label for="city" class="sr-only">City</label>
              <input formControlName="city" type="text"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="City">
            </div>

            <div>
              <label for="country" class="sr-only">Country</label>
              <input formControlName="country" type="text"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Country">
            </div>

            <div>
              <label for="zipCode" class="sr-only">Zip Code</label>
              <input formControlName="zipCode" type="text"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Zip Code">
            </div>
          </div>

          <!-- Error Message -->
          <div *ngIf="error$ | async as error" class="text-red-500 text-sm text-center">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <div>
            <button type="submit"
              [disabled]="registerForm.invalid || (loading$ | async)"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
              <span *ngIf="loading$ | async">Registering...</span>
              <span *ngIf="!(loading$ | async)">Register</span>
            </button>
          </div>

          <!-- Login Link -->
          <div class="text-sm text-center">
            <a routerLink="/auth/login" class="font-medium text-indigo-600 hover:text-indigo-500">
              Already have an account? Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
    
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const request = {
        ...this.registerForm.value,
        dateOfBirth: new Date(this.registerForm.value.dateOfBirth)
      };
      this.store.dispatch(registerHouseHold({ request }));
    }
  }
}
