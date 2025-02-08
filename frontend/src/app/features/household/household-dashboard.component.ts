import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavHeaderComponent } from '@shared/components/nav-header.component';

@Component({
  selector: 'app-household-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavHeaderComponent],
  template: `
    <div class="min-h-screen bg-gray-100">
      <app-nav-header></app-nav-header>

      <div class="flex">
        <!-- Sidebar -->
        <aside class="w-64 bg-white shadow-lg h-screen fixed">
          <div class="flex flex-col h-full">
            <!-- Sidebar Header -->
            <div class="p-4 border-b">
              <h2 class="text-xl font-semibold text-gray-800">Household</h2>
            </div>

            <!-- Navigation Links -->
            <nav class="flex-1 overflow-y-auto p-4">
              <ul class="space-y-2">
                <li>
                  <a routerLink="/household/dashboard"
                     routerLinkActive="bg-green-50 text-green-600"
                     class="flex items-center px-4 py-2.5 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span class="ml-3">Dashboard</span>
                  </a>
                </li>

                <li>
                  <a routerLink="/household/collections"
                     routerLinkActive="bg-green-50 text-green-600"
                     class="flex items-center px-4 py-2.5 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span class="ml-3">Collections</span>
                  </a>
                </li>

                <li>
                  <a routerLink="/household/collections/new"
                     routerLinkActive="bg-green-50 text-green-600"
                     class="flex items-center px-4 py-2.5 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span class="ml-3">New Collection</span>
                  </a>
                </li>

                <li>
                  <a routerLink="/household/rewards"
                     routerLinkActive="bg-green-50 text-green-600"
                     class="flex items-center px-4 py-2.5 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="ml-3">Points & Rewards</span>
                  </a>
                </li>

                <li>
                  <a routerLink="/household/profile"
                     routerLinkActive="bg-green-50 text-green-600"
                     class="flex items-center px-4 py-2.5 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="ml-3">Profile</span>
                  </a>
                </li>
              </ul>
            </nav>

            <!-- User Info -->
            <div class="p-4 border-t">
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span class="text-green-600 font-semibold">JD</span>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-700">John Doe</p>
                  <p class="text-xs text-gray-500">Household</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 ml-64 p-8">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class HouseholdDashboardComponent {}
