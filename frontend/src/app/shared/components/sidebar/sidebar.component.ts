import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface SidebarLink {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="bg-green-800 text-white w-64 min-h-screen px-4 py-6">
   

      <nav>
        <ul class="space-y-2">
          <li *ngFor="let link of links">
            <a
              [routerLink]="link.route"
              routerLinkActive="bg-green-700"
              class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <span class="text-xl" [innerHTML]="link.icon"></span>
              <span>{{ link.label }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  `
})
export class SidebarComponent {
  @Input() sectionTitle: string = '';
  @Input() links: SidebarLink[] = [];
}
