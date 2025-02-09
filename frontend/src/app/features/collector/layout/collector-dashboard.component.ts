import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-collector-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-10">
        <!-- Logo -->
        <div class="flex items-center justify-center h-16 border-b">
          <span class="text-2xl font-bold text-green-600">RecycleHub</span>
        </div>

        <!-- Navigation Links -->
        <nav class="mt-6">
          <div class="px-4 space-y-2">
            <a routerLink="/collector/dashboard" 
               routerLinkActive="bg-green-500 text-white"
               [routerLinkActiveOptions]="{exact: true}"
               class="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-200">
              <mat-icon class="mr-3">dashboard</mat-icon>
              Dashboard
            </a>

            <a routerLink="/collector/collections"
               routerLinkActive="bg-green-500 text-white"
               [routerLinkActiveOptions]="{exact: true}"
               class="flex items-center px-4 py-2.5 text-gray-700 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-200">
              <mat-icon class="mr-3">recycling</mat-icon>
              Collections
            </a>
          </div>
        </nav>

        <!-- User Menu -->
        <div class="absolute bottom-0 w-full p-4">
          <button mat-button [matMenuTriggerFor]="userMenu" 
                  class="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <mat-icon class="mr-3">account_circle</mat-icon>
            <span class="flex-1 text-left">{{ (authService.user$ | async)?.firstName }} {{ (authService.user$ | async)?.lastName }}</span>
            <mat-icon>expand_more</mat-icon>
          </button>
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item (click)="authService.logout()">
              <mat-icon>logout</mat-icon>
              <span>Logout</span>
            </button>
          </mat-menu>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="ml-64 p-8">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class CollectorDashboardComponent {
  constructor(public authService: AuthService) {}
}
