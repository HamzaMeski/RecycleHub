import { Component } from '@angular/core';
import { NavHeaderComponent } from '@shared/components/nav-header.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NavHeaderComponent],
  template: `
    <app-nav-header title="Admin Dashboard"></app-nav-header>
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white shadow rounded-lg p-6">
        <p class="text-gray-600">Welcome to the Admin Control Panel</p>
        <!-- Add admin-specific features here -->
      </div>
    </div>
  `
})
export class AdminDashboardComponent {}
