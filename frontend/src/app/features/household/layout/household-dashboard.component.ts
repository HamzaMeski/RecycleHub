import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import { logout } from '@store/actions/auth.actions';

@Component({
  selector: 'app-household-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-10">
        <!-- Logo -->
        <div class="flex items-center justify-center h-16 border-b">
          <span class="text-2xl font-bold text-green-600">RecycleHub</span>
        </div>

        <!-- Navigation Links -->
        <nav class="flex flex-col h-[calc(100%-4rem)] justify-between">
          <div class="px-4 space-y-2 mt-6">
            <a routerLink="/household/dashboard" 
               routerLinkActive="bg-green-500 text-white"
               [routerLinkActiveOptions]="{exact: true}"
               class="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </a>

            <a routerLink="/household/collections/new"
               routerLinkActive="bg-green-500 text-white"
               class="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Collection
            </a>

            <a routerLink="/household/collections"
               routerLinkActive="bg-green-500 text-white"
               [routerLinkActiveOptions]="{exact: true}"
               class="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              My Collections
            </a>

            <a routerLink="/household/rewards"
               routerLinkActive="bg-green-500 text-white"
               class="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Points & Rewards
            </a>

            <a routerLink="/household/profile"
               routerLinkActive="bg-green-500 text-white"
               class="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </a>
          </div>

          <!-- Logout Button at Bottom -->
          <div class="px-4 mb-6">
            <button (click)="logout()" 
                    class="flex items-center w-full px-4 py-2.5 text-gray-700 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <div class="ml-64">
        <!-- Page Content -->
        <main class="p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class HouseholdDashboardComponent {
  constructor(
    private authService: AuthService,
    private store: Store
  ) {}

  logout() {
    this.store.dispatch(logout());
  }
}
