import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private userId$: BehaviorSubject<string | null>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if running on the browser and initialize accordingly
    if (isPlatformBrowser(this.platformId)) {
      this.userId$ = new BehaviorSubject<string | null>(localStorage.getItem('userId'));
    } else {
      this.userId$ = new BehaviorSubject<string | null>(null);
    }
  }

  getUserId$(): Observable<string | null> {
    return this.userId$.asObservable();
  }

  updateUserId(userId: string | null) {
    this.userId$.next(userId);
    if (isPlatformBrowser(this.platformId)) {
      if (userId === null) {
        localStorage.removeItem('userId');
      } else {
        localStorage.setItem('userId', userId);
      }
    }
  }
}
