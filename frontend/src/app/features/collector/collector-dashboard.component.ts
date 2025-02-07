import { Component } from '@angular/core';
import { NavHeaderComponent } from '@shared/components/nav-header.component';

@Component({
  selector: 'app-collector-dashboard',
  standalone: true,
  imports: [NavHeaderComponent],
  template: `
    <app-nav-header title="Collector Dashboard"></app-nav-header>
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white shadow rounded-lg p-6">
        <p class="text-gray-600">Welcome to the Collector Portal</p>
        <!-- Add collector-specific features here -->
      </div>
    </div>
  `
})
export class CollectorDashboardComponent {}
