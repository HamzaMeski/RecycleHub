import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CollectionService } from '@core/services/collection.service';
import { Collection } from '@shared/types/models';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="grid grid-cols-1 gap-6">
      <!-- Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Total Collections -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-500">
              <mat-icon class="h-8 w-8">recycling</mat-icon>
            </div>
            <div class="ml-4">
              <h2 class="text-gray-600 text-sm">Total Collections</h2>
              <p class="text-2xl font-semibold text-gray-700">{{ totalCollections }}</p>
            </div>
          </div>
        </div>

        <!-- Points Earned -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-500">
              <mat-icon class="h-8 w-8">stars</mat-icon>
            </div>
            <div class="ml-4">
              <h2 class="text-gray-600 text-sm">Points Earned</h2>
              <p class="text-2xl font-semibold text-gray-700">{{ totalPoints }}</p>
            </div>
          </div>
        </div>

        <!-- Active Collections -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 text-yellow-500">
              <mat-icon class="h-8 w-8">pending_actions</mat-icon>
            </div>
            <div class="ml-4">
              <h2 class="text-gray-600 text-sm">Active Collections</h2>
              <p class="text-2xl font-semibold text-gray-700">{{ activeCollections }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Collections -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
          <h2 class="text-lg font-semibold text-gray-800">Recent Collections</h2>
        </div>
        <div class="divide-y">
          <div *ngFor="let collection of recentCollections" class="p-6">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm text-gray-600">Request #{{ collection.id }}</p>
                <p class="font-medium">{{ collection.collectionAddress }}, {{ collection.city }}</p>
                <p class="text-sm text-gray-500">{{ collection.createdAt | date }}</p>
              </div>
              <div>
                <span [class]="getStatusClass(collection.status)">
                  {{ collection.status }}
                </span>
              </div>
            </div>
          </div>
          <div *ngIf="recentCollections.length === 0" class="p-6 text-center text-gray-500">
            No recent collections
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardContentComponent implements OnInit {
  totalCollections = 0;
  totalPoints = 0;
  activeCollections = 0;
  recentCollections: Collection[] = [];

  constructor(private collectionService: CollectionService) {}

  ngOnInit() {
    this.loadCollectorStats();
    this.loadRecentCollections();
  }

  loadCollectorStats() {
    // TODO: Implement collector stats loading
  }

  loadRecentCollections() {
    this.collectionService.getCollectorRequests().subscribe({
      next: (collections: Collection[]) => {
        this.recentCollections = collections.slice(0, 5); // Show last 5 collections
        this.calculateStats(collections);
      },
      error: (error: any) => {
        console.error('Error loading collections:', error);
      }
    });
  }

  calculateStats(collections: Collection[]) {
    this.totalCollections = collections.length;
    this.activeCollections = collections.filter(c => 
      c.status === 'IN_PROGRESS' || c.status === 'OCCUPIED'
    ).length;
    this.totalPoints = collections.reduce((sum, c) => sum + (c.points || 0), 0);
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case 'PENDING':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'OCCUPIED':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'IN_PROGRESS':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'VALIDATED':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }
}
