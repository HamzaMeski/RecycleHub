import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardLayoutComponent } from '@shared/components/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-collection-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DashboardLayoutComponent],
  template: `
    <app-dashboard-layout
      sectionTitle="My Collections"
      [sidebarLinks]="sidebarLinks"
    >
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">My Collection Requests</h1>
        <a 
          routerLink="/household/collections/new"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          New Collection
        </a>
      </div>

      <!-- Filters -->
      <div class="bg-white p-4 rounded-lg shadow mb-6">
        <div class="flex gap-4">
          <button 
            *ngFor="let status of ['All', 'Pending', 'Accepted', 'Completed']"
            (click)="filterByStatus(status)"
            [class.bg-green-600]="selectedStatus === status"
            [class.text-white]="selectedStatus === status"
            [class.bg-gray-100]="selectedStatus !== status"
            class="px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {{ status }}
          </button>
        </div>
      </div>

      <!-- Collections Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let collection of filteredCollections">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ collection.createdAt | date:'medium' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span [class]="getStatusClass(collection.status)">
                  {{ collection.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ collection.address }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ collection.weightInKg }} kg
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ collection.points }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex gap-2">
                  <button 
                    *ngIf="collection.status === 'PENDING'"
                    (click)="editCollection(collection.id)"
                    class="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button 
                    *ngIf="collection.status === 'PENDING'"
                    (click)="cancelCollection(collection.id)"
                    class="text-red-600 hover:text-red-800"
                  >
                    Cancel
                  </button>
                  <button
                    (click)="viewDetails(collection.id)"
                    class="text-green-600 hover:text-green-800"
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
            
            <!-- Empty State -->
            <tr *ngIf="filteredCollections.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                No collection requests found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </app-dashboard-layout>
  `
})
export class CollectionListComponent implements OnInit {
  sidebarLinks = [
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>',
      label: 'Dashboard',
      route: '/household'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>',
      label: 'New Collection',
      route: '/household/collections/new'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>',
      label: 'My Collections',
      route: '/household/collections'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
      label: 'Points & Rewards',
      route: '/household/rewards'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',
      label: 'Profile',
      route: '/household/profile'
    }
  ];

  collections: any[] = [
    {
      id: 1,
      createdAt: new Date(),
      status: 'PENDING',
      address: '123 Green St, Eco City',
      weightInKg: 5.2,
      points: 52
    },
    {
      id: 2,
      createdAt: new Date(Date.now() - 86400000), // yesterday
      status: 'COMPLETED',
      address: '456 Recycle Ave, Eco City',
      weightInKg: 3.8,
      points: 38
    }
  ];

  filteredCollections: any[] = [];
  selectedStatus: string = 'All';

  ngOnInit() {
    this.filterByStatus('All');
  }

  filterByStatus(status: string) {
    this.selectedStatus = status;
    if (status === 'All') {
      this.filteredCollections = this.collections;
    } else {
      this.filteredCollections = this.collections.filter(c => c.status === status);
    }
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
    switch (status) {
      case 'PENDING':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'ACCEPTED':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'COMPLETED':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  editCollection(id: number) {
    // TODO: Implement edit functionality
    console.log('Edit collection:', id);
  }

  cancelCollection(id: number) {
    // TODO: Implement cancel functionality
    console.log('Cancel collection:', id);
  }

  viewDetails(id: number) {
    // TODO: Implement view details functionality
    console.log('View collection:', id);
  }
}
