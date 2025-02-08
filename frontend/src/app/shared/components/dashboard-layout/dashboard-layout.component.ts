import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavHeaderComponent } from '../nav-header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, NavHeaderComponent, SidebarComponent],
  template: `
    <div class="min-h-screen bg-gray-100">
      <app-nav-header></app-nav-header>
      
      <div class="flex">
        <app-sidebar 
          [sectionTitle]="sectionTitle"
          [links]="sidebarLinks"
        ></app-sidebar>
        
        <main class="flex-1 p-8">
          <ng-content></ng-content>
        </main>
      </div>
    </div>
  `
})
export class DashboardLayoutComponent {
  @Input() sectionTitle: string = '';
  @Input() sidebarLinks: any[] = [];
}
