import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarListComponent } from './car-list/car-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'carList', component: CarListComponent },
  // Add other routes here
];
