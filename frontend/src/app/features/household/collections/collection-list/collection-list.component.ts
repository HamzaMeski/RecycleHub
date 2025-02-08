import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collection-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">My Collections</h1>
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
    </div>
  `
})
export class CollectionListComponent implements OnInit {

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
