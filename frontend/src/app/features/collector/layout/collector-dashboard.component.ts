import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import { logout } from '@store/actions/auth.actions';

@Component({
  selector: 'app-collector-dashboard',
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
            <a routerLink="/collector/dashboard"
               routerLinkActive="bg-green-500 text-white"
               [routerLinkActiveOptions]="{exact: true}"
               class="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </a>

            <a routerLink="/collector/collections"
               routerLinkActive="bg-green-500 text-white"
               class="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Collections
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
export class CollectorDashboardComponent {
  constructor(
    private authService: AuthService,
    private store: Store
  ) {}

  logout() {
    this.store.dispatch(logout());
  }
}
