import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutServerModule,
    FlexLayoutModule,
  ],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss',
})
export class CarCardComponent {
  @Input() carImage!: string;  // Using definite assignment assertion (!)
  @Input() carName!: string;   // Using definite assignment assertion (!)
  @Input() carPrice!: number; 
}
