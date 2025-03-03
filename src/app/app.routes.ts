import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OpenPageComponent } from './pages/open-page/open-page.component';
import {MainComponent} from "./pages/main/main.component";
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component"; // Import the OpenPageComponent
export const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'open-page', component: OpenPageComponent }, // Add this line for the open-page component
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Default route
];
