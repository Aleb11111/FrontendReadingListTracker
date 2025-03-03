// register.component.ts
import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    email: '',
    username: '',
    password: ''
  };
  confirmPassword: string; // Variable to hold password confirmation
  passwordMismatchError = false; // Flag to control display of password mismatch error message

  constructor(private userService: UserService, private router: Router) {}

  register() {
    if (this.user.password === this.confirmPassword) { // Check if passwords match
      // Proceed with registration
      this.userService.register(this.user.username, this.user.email, this.user.password).subscribe(
        response => {
          console.log(response); // Handle success response
          // Redirect to open-page upon successful registration
          this.router.navigate(['/open-page']);
        },
        error => {
          console.error(error); // Handle error response
        }
      );
    } else {
      // Set flag to display password mismatch error message
      this.passwordMismatchError = true;
      console.error("Passwords don't match"); // Log error if passwords don't match
    }
  }
}
