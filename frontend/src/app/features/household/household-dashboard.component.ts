import { Component } from '@angular/core';
import { NavHeaderComponent } from '@shared/components/nav-header.component';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-household-dashboard',
  standalone: true,
  imports: [NavHeaderComponent, ProfileComponent],
  template: `
    <app-nav-header title="Household Dashboard"></app-nav-header>
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 gap-6">
        <div class="bg-white shadow rounded-lg p-6">
          <h1 class="text-2xl font-bold text-gray-800">Welcome to RecycleHub</h1>
          <p class="mt-2 text-gray-600">
            Manage your profile and track your recycling activities
          </p>
        </div>
        
        <app-profile></app-profile>
      </div>
    </div>
  `
})
export class HouseholdDashboardComponent {}
