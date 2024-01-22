import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CarCardComponent } from '../car-card/car-card.component';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CarCardComponent],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss',
})
export class CarListComponent implements OnInit {
  public selectedDateRange: [Date, Date] | null = null;

  carData = [
    { carImage: 'https://i.gaw.to/content/photos/52/66/526603-bmw-x1-2023-une-refonte-complete-avec-un-moteur-plus-puissant.jpeg', carName: 'BMW X1', carPrice: 25000 },
    { carImage: 'https://i.gaw.to/content/photos/52/66/526603-bmw-x1-2023-une-refonte-complete-avec-un-moteur-plus-puissant.jpeg', carName: 'Car 2', carPrice: 30000 },
    { carImage: 'https://i.gaw.to/content/photos/52/66/526603-bmw-x1-2023-une-refonte-complete-avec-un-moteur-plus-puissant.jpeg', carName: 'Car 3', carPrice: 22000 },
    { carImage: 'https://i.gaw.to/content/photos/52/66/526603-bmw-x1-2023-une-refonte-complete-avec-un-moteur-plus-puissant.jpeg', carName: 'Car 4', carPrice: 28000 },
    { carImage: 'https://i.gaw.to/content/photos/52/66/526603-bmw-x1-2023-une-refonte-complete-avec-un-moteur-plus-puissant.jpeg', carName: 'Car 5', carPrice: 35000 },
    { carImage: 'https://i.gaw.to/content/photos/52/66/526603-bmw-x1-2023-une-refonte-complete-avec-un-moteur-plus-puissant.jpeg', carName: 'Car 6', carPrice: 27000 },
  ];



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
