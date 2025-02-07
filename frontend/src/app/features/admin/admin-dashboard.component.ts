import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div class="bg-white shadow rounded-lg p-6">
        <p class="text-gray-600">Welcome to the Admin Control Panel</p>
        <!-- Add admin-specific features here -->
      </div>
    </div>
  `
})
export class AdminDashboardComponent {}
