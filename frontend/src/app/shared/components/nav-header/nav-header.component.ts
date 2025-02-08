import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '@store/selectors/auth.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-green-600 shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img class="h-8 w-8" src="assets/logo.png" alt="RecycleHub">
              <span class="ml-2 text-white font-bold">RecycleHub</span>
            </div>
            
            <!-- Navigation Links -->
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <!-- Common Links -->
              <a routerLink="/dashboard" 
                 routerLinkActive="border-white"
                 class="text-white hover:border-white px-3 py-2 text-sm font-medium">
                Dashboard
              </a>

              <!-- Household-specific Links -->
              <ng-container *ngIf="isHousehold$ | async">
                <a routerLink="/household/collection-requests" 
                   routerLinkActive="border-white"
                   class="text-white hover:border-white px-3 py-2 text-sm font-medium">
                  Collection Requests
                </a>
                <a routerLink="/household/rewards" 
                   routerLinkActive="border-white"
                   class="text-white hover:border-white px-3 py-2 text-sm font-medium">
                  Rewards
                </a>
              </ng-container>

              <!-- Collector-specific Links -->
              <ng-container *ngIf="isCollector$ | async">
                <a routerLink="/collector/assignments" 
                   routerLinkActive="border-white"
                   class="text-white hover:border-white px-3 py-2 text-sm font-medium">
                  Assignments
                </a>
                <a routerLink="/collector/schedule" 
                   routerLinkActive="border-white"
                   class="text-white hover:border-white px-3 py-2 text-sm font-medium">
                  Schedule
                </a>
              </ng-container>

              <!-- Admin-specific Links -->
              <ng-container *ngIf="isAdmin$ | async">
                <a routerLink="/admin/users" 
                   routerLinkActive="border-white"
                   class="text-white hover:border-white px-3 py-2 text-sm font-medium">
                  Users
                </a>
                <a routerLink="/admin/reports" 
                   routerLinkActive="border-white"
                   class="text-white hover:border-white px-3 py-2 text-sm font-medium">
                  Reports
                </a>
              </ng-container>
            </div>
          </div>

          <!-- Profile Dropdown -->
          <div class="flex items-center">
            <a routerLink="/profile" 
               class="text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium">
              Profile
            </a>
            <button (click)="logout()" 
                    class="ml-4 text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavHeaderComponent implements OnInit {
  // Role-based observables
  isAdmin$: Observable<boolean>;
  isCollector$: Observable<boolean>;
  isHousehold$: Observable<boolean>;

  constructor(private store: Store) {
    // Get user from store and map to role-specific booleans
    const user$ = this.store.select(selectUser);
    
    this.isAdmin$ = user$.pipe(
      map(user => user?.role === 'ADMIN')
    );
    
    this.isCollector$ = user$.pipe(
      map(user => user?.role === 'COLLECTOR')
    );
    
    this.isHousehold$ = user$.pipe(
      map(user => user?.role === 'HOUSEHOLD')
    );
  }

  ngOnInit(): void {}

  logout(): void {
    // Implement logout logic
  }
}
