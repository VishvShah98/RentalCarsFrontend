import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ModalService } from '../modal.service';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  today = new Date();
  userId: string | null = null;
  constructor(
    private router: Router,
    private modalService: ModalService,
    private appStateService: AppStateService
  ) {
   
  }
  ngOnInit() {
    this.appStateService.getUserId$().subscribe(userId => {
      this.userId = userId;
    });
  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

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

  onSearchCars() {
    const startDate = this.range.get('start')?.value as Date;
    const endDate = this.range.get('end')?.value as Date;

    // Set the selected date range in local storage
    localStorage.setItem(
      'selectedDateRange',
      JSON.stringify([startDate, endDate])
    );

    // Navigate to the CarListComponent when the "Search Cars" button is clicked
    this.router.navigate(['/carList']);
  }

  isSearchDisabled(): boolean {
    return (
      this.range.invalid ||
      this.range.get('start')?.value == null ||
      this.range.get('end')?.value == null
    );
  }
}
