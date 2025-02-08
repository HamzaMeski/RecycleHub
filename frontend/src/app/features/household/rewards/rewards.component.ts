import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from '@shared/components/dashboard-layout/dashboard-layout.component';

interface Voucher {
  id: number;
  type: string;
  description: string;
  pointsCost: number;
  isAvailable: boolean;
}

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent],
  template: `
    <app-dashboard-layout
      sectionTitle="Points & Rewards"
      [sidebarLinks]="sidebarLinks"
    >
      <div class="space-y-6">
        <!-- Points Overview -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Total Points Card -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <h2 class="text-lg font-semibold text-gray-700">Available Points</h2>
                <p class="text-3xl font-bold text-green-600">1,250</p>
              </div>
            </div>
          </div>

          <!-- Points History Card -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div class="ml-4">
                <h2 class="text-lg font-semibold text-gray-700">Total Points Earned</h2>
                <p class="text-3xl font-bold text-blue-600">2,500</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Available Vouchers -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">Available Vouchers</h2>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div *ngFor="let voucher of availableVouchers" class="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800">{{ voucher.type }}</h3>
                    <p class="text-sm text-gray-600 mt-1">{{ voucher.description }}</p>
                  </div>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {{ voucher.pointsCost }} Points
                  </span>
                </div>
                <button
                  (click)="redeemVoucher(voucher)"
                  [disabled]="!voucher.isAvailable"
                  class="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Redeem Voucher
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div class="p-6">
            <div class="flow-root">
              <ul role="list" class="-mb-8">
                <li *ngFor="let activity of recentActivity; let last = last">
                  <div class="relative pb-8">
                    <span *ngIf="!last" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div class="relative flex space-x-3">
                      <div>
                        <span [class]="getActivityIconClass(activity.type)">
                          <svg *ngIf="activity.type === 'earned'" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <svg *ngIf="activity.type === 'redeemed'" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                        </span>
                      </div>
                      <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p class="text-sm text-gray-500">{{ activity.description }}</p>
                        </div>
                        <div class="text-right text-sm whitespace-nowrap text-gray-500">
                          <time [dateTime]="activity.date">{{ activity.date | date:'medium' }}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </app-dashboard-layout>
  `
})
export class RewardsComponent {
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

  availableVouchers: Voucher[] = [
    {
      id: 1,
      type: 'Grocery Store Discount',
      description: '10% off at EcoMart Grocery Store',
      pointsCost: 500,
      isAvailable: true
    },
    {
      id: 2,
      type: 'Public Transport Pass',
      description: 'One-day free pass for public transport',
      pointsCost: 750,
      isAvailable: true
    },
    {
      id: 3,
      type: 'Movie Tickets',
      description: 'Two free movie tickets at CineGreen',
      pointsCost: 1000,
      isAvailable: true
    }
  ];

  recentActivity = [
    {
      type: 'earned',
      description: 'Earned 52 points for recycling 5.2kg of waste',
      date: new Date()
    },
    {
      type: 'redeemed',
      description: 'Redeemed Grocery Store Discount voucher',
      date: new Date(Date.now() - 86400000)
    },
    {
      type: 'earned',
      description: 'Earned 38 points for recycling 3.8kg of waste',
      date: new Date(Date.now() - 172800000)
    }
  ];

  getActivityIconClass(type: string): string {
    const baseClasses = 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white';
    return type === 'earned'
      ? `${baseClasses} bg-green-500 text-white`
      : `${baseClasses} bg-blue-500 text-white`;
  }

  redeemVoucher(voucher: Voucher) {
    // TODO: Implement voucher redemption
    console.log('Redeeming voucher:', voucher);
  }
}
