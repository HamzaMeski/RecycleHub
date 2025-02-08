import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '@store/selectors/auth.selectors';
import { map, take } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private platformId = inject(PLATFORM_ID);

  constructor(
    private router: Router,
    private store: Store
  ) {}

  canActivate() {
    // Only check localStorage if we're in the browser
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/auth/login']);
        return false;
      }
    }

    return this.store.select(selectAuthUser).pipe(
      take(1),
      map(user => {
        if (user) {
          return true;
        }
        
        this.router.navigate(['/auth/login']);
        return false;
      })
    );
  }
}
