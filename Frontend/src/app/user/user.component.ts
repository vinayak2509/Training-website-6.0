import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  errorMessage: string | null = null;
  enteredNewPassword = '';
  enteredConfirmedNewPassword = '';
  loggedInUser = sessionStorage.getItem('user');
  userEmail = this.loggedInUser ? JSON.parse(this.loggedInUser).email : null;
  storedLoginStatus = sessionStorage.getItem('isLoggedIn');
  isLoggedIn = this.storedLoginStatus === 'true';

  constructor(private http: HttpClient, private router: Router) {}

  onLogout(): void {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('user');
    this.isLoggedIn = false;

    window.location.href = '/login';

    alert('You have been logged out');
  }

  onSubmit() {
    if (this.enteredNewPassword !== this.enteredConfirmedNewPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    this.errorMessage = null;

    const payload = {
      email: this.userEmail,
      newPassword: this.enteredNewPassword,
    };

    this.http.put(`${environment.backendUrl}/update`, payload).subscribe(
      (response) => {
        console.log('Password updated successfully:', response);
        alert('Password updated successfully!');
        this.enteredNewPassword = '';
        this.enteredConfirmedNewPassword = '';
        this.onLogout();
      },
      (error) => {
        console.error('Error updating password:', error);
        this.errorMessage =
          error.error?.message || 'Failed to update password.';
      }
    );
  }
}
