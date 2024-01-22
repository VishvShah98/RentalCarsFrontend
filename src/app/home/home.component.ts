import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { ModalService } from '../modal.service';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NavbarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  today = new Date();

  ngOnInit() {
    // Check if localStorage is available before using it
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('selectedDateRange', JSON.stringify(null));
    }
  }

  constructor(
    private router: Router,
    private modalService: ModalService,
    private appStateService: AppStateService
  ) {
  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

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
