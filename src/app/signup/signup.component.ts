import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppStateService } from '../app-state.service';
import { environment } from '../environment';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private router: Router,
    private appStateService: AppStateService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{1,}$/),
      ]),
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const apiUrl = environment.apiUrl + 'Users/register';
      const formData = this.signUpForm.value;

      this.http.post(apiUrl, formData).subscribe({
        next: (response: any) => {
          // Handle successful registration response
          console.log('Registration successful:', response);

          // You can update app state or navigate to another page here
          this.appStateService.updateUserId(response.userId);

          // Display a success Snackbar
          this.snackBar.open('Registration successful', 'Close', {
            duration: 3000, // Set the duration in milliseconds
          });
        },
        error: (error) => {
          // Handle registration error
          console.error('Registration error:', error);

          // You can display an error message to the user here
          alert(error.message);
        },
      });
    }
  }

  ngOnInit(): void {}
}
