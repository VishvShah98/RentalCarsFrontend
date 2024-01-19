import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss',
})
export class CarListComponent implements OnInit {
  public selectedDateRange: [Date, Date] | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if localStorage is available
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
}
