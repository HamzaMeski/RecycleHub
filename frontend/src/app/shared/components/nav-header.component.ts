import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { logout } from '@store/actions/auth.actions';
import { AppState } from '@store/index';
import { selectAuthUser } from '@store/selectors/auth.selectors';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold">{{ title }}</h1>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <!-- HouseHold Profile Badge -->
            <div *ngIf="(isHousehold$ | async) === true" 
                 class="flex items-center px-3 py-2 bg-green-100 text-green-800 rounded-lg shadow-sm hover:bg-green-200 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" 
                   class="h-5 w-5 mr-2" 
                   fill="none" 
                   viewBox="0 0 24 24" 
                   stroke="currentColor">
                <path stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="font-medium">HouseHold Profile</span>
            </div>

            <!-- Logout Button -->
            <button
              (click)="onLogout()"
              class="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavHeaderComponent {
  @Input() title: string = 'RecycleHub';
  isHousehold$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isHousehold$ = this.store.select(selectAuthUser).pipe(
      map(user => user?.userType === 'HOUSEHOLD')
    );
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
