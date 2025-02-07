import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { logout } from '@store/actions/auth.actions';
import { AppState } from '@store/index';

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
          <div class="flex items-center">
            <button
              (click)="onLogout()"
              class="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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

  constructor(private store: Store<AppState>) {}

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
