import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rewards-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <!-- Points Overview -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Your Points</h2>
            <p class="text-gray-600 mt-1">Earn points by recycling waste</p>
          </div>
          <div class="text-right">
            <p class="text-3xl font-bold text-green-600">1,250</p>
            <p class="text-sm text-gray-500">Total Points</p>
          </div>
        </div>
      </div>

      <!-- Available Rewards -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b">
          <h3 class="text-lg font-semibold text-gray-800">Available Rewards</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Reward Card 1 -->
            <div class="bg-white border rounded-lg overflow-hidden">
              <div class="p-4">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-lg font-semibold text-gray-800">$10 Gift Card</h4>
                  <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">1000 points</span>
                </div>
                <p class="text-gray-600 text-sm mb-4">Redeem for a $10 gift card at participating stores</p>
                <button class="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200">
                  Redeem Reward
                </button>
              </div>
            </div>

            <!-- Reward Card 2 -->
            <div class="bg-white border rounded-lg overflow-hidden">
              <div class="p-4">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-lg font-semibold text-gray-800">Movie Tickets</h4>
                  <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">1500 points</span>
                </div>
                <p class="text-gray-600 text-sm mb-4">Get two movie tickets for your next cinema visit</p>
                <button class="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200">
                  Redeem Reward
                </button>
              </div>
            </div>

            <!-- Reward Card 3 -->
            <div class="bg-white border rounded-lg overflow-hidden">
              <div class="p-4">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-lg font-semibold text-gray-800">Eco-friendly Kit</h4>
                  <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">2000 points</span>
                </div>
                <p class="text-gray-600 text-sm mb-4">Get a kit of eco-friendly household products</p>
                <button class="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200">
                  Redeem Reward
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Redemption History -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b">
          <h3 class="text-lg font-semibold text-gray-800">Redemption History</h3>
        </div>
        <div class="p-6">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points Used</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-02-01</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$10 Gift Card</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1000</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Redeemed
                  </span>
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-01-15</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Movie Tickets</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1500</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Redeemed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class RewardsContentComponent {}
