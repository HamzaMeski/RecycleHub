import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '@store/selectors/auth.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { logout } from '@store/actions/auth.actions';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="bg-green-600 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 flex justify-between">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <span class="ml-2 text-white font-bold">RecycleHub</span>
            </div>
          </div>
        </div>

        <!-- Profile and Logout Section -->
        <div class="flex items-center space-x-4">
          <!-- HouseHold Profile Dropdown -->
          <div *ngIf="(isHousehold$ | async) === true" class="relative cursor-pointer">
            <button
              (click)="toggleDropdown()"
              class="flex items-center px-3 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="font-medium">HouseHold Profile</span>
            </button>

            <!-- Dropdown Menu -->
            <div *ngIf="isDropdownOpen"
                 class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <a routerLink="/household/profile"
                 class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                 (click)="toggleDropdown()">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile Management
              </a>
              <a routerLink="/household/points"
                 class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                 (click)="toggleDropdown()">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                My Points
              </a>
            </div>
          </div>

          <!-- Logout Button -->
          <button
            (click)="onLogout()"
            class="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  `
})
export class NavHeaderComponent {
  isHousehold$: Observable<boolean>;
  isCollector$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isDropdownOpen = false;

  constructor(
    private store: Store,
    private router: Router
  ) {
    const user$ = this.store.select(selectAuthUser);

    this.isAdmin$ = user$.pipe(
      map(user => user?.userType === 'ADMIN')
    );

    this.isCollector$ = user$.pipe(
      map(user => user?.userType === 'COLLECTOR')
    );

    this.isHousehold$ = user$.pipe(
      map(user => user?.userType === 'HOUSEHOLD')
    );
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onLogout(): void {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Dispatch logout action
    this.store.dispatch(logout());

    // Navigate to login page
    this.router.navigate(['/auth/login']);
  }
}
