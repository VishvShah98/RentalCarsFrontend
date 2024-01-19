import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AppStateService } from '../app-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private router: Router,
    private appStateService: AppStateService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const apiUrl = environment.apiUrl + 'Users/login';
      const formData = this.loginForm.value;
      this.loading = true;

      this.http.post(apiUrl, formData).subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);

          // Update app state with the user ID
          this.appStateService.updateUserId(response.userId);

          // Close the dialog
          this.dialogRef.close();

          // Display a success Snackbar
          this.snackBar.open('Login successful', 'Close', {
            duration: 3000,
          });
        },
        error: (error) => {
          console.error('Login error:', error);

          // Display an error message to the user
          alert(error.message);
        },
        complete: () => {
          this.loading = false; // Hide the progress spinner when the request is completed
        },
      });
    }
  }

  ngOnInit(): void {}
}
