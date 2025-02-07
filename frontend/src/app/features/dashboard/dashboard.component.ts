import { Component } from '@angular/core';
import { NavHeaderComponent } from '@shared/components/nav-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      <div class="bg-white shadow rounded-lg p-6">
        <p class="text-gray-600">You are successfully logged in!</p>
      </div>
    </div>
  `
})
export class DashboardComponent {}

@Component({
  selector: 'app-household-dashboard',
  standalone: true,
  imports: [NavHeaderComponent],
  template: `
    <app-nav-header title="Household Dashboard"></app-nav-header>
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white shadow rounded-lg p-6">
        <p class="text-gray-600">Welcome to your Household Recycling Portal</p>
        <!-- Add household-specific features here -->
      </div>
    </div>
  `
})
export class HouseholdDashboardComponent {}
