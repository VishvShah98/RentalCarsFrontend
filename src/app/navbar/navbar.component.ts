import { Component } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalService } from '../modal.service';
import { AppStateService } from '../app-state.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  userId: string | null = null;
  public selectedDateRange: [Date, Date] | null = null;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private appStateService: AppStateService
  ) {}

  ngOnInit() {
    this.appStateService.getUserId$().subscribe((userId) => {
      this.userId = userId;
    });
    if (typeof localStorage !== 'undefined') {
      // Retrieve the selected date range from local storage
      const storedDateRange = localStorage.getItem('selectedDateRange');
      this.selectedDateRange = storedDateRange
        ? JSON.parse(storedDateRange)
        : null;

      // Check if selectedDateRange is not available, then route to the default path
      if (!this.selectedDateRange) {
        this.router.navigate(['/']); // Replace '/default' with your actual default path
      }
    } else {
      // Handle the case where localStorage is not available (e.g., for server-side rendering)
      this.selectedDateRange = null;
    }
  }

  showSignUp() {
    // Implement logic to show sign-up form or navigate to sign-up page
    this.modalService.openSignUpModal();
  }

  showLogin() {
    // Implement logic to show login form or navigate to login page
    this.modalService.openLoginModal();
  }

  showMyBookings() {
    // Implement logic to navigate to the "My Bookings" page
  }

  logout() {
    // Implement logic to log the user out and set isLoggedIn to false
    this.appStateService.updateUserId(null);
  }
  goToHomePage() {
    // Use the Router to navigate to the home page
    this.router.navigate(['/']);
  }
}
