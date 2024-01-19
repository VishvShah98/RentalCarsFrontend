import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openSignUpModal(): void {
    this.dialog.open(SignUpComponent, {});
  }

  openLoginModal(): void {
    this.dialog.open(LoginComponent, {});
  }
}
