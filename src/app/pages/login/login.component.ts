import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import {FormsModule} from "@angular/forms";
import {User} from "../../Model/User";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    username: '',
    password: ''
  };
  loginError: string; // Variable to hold login error message
  loginSuccess: boolean = false; // Variable to indicate successful login

  constructor(private userService: UserService, private router: Router) { }

  login() {
    this.userService.login(this.user.username, this.user.email, this.user.password).subscribe(
      response => {
        console.log(response); // Handle success response
        // Optionally, you can redirect the user or perform other actions upon successful login
        this.loginSuccess = true; // Set loginSuccess to true
        // For example, navigate to a different page
        this.router.navigate(['/open-page']); // Change '/dashboard' to your desired route
      },
      error => {
        console.error(error); // Handle error response
        // Display login error message
        this.loginError = "Invalid username/email or password.";
      }
    );
  }
}
