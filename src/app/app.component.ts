import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {Book} from "./Model/Book/Book";
import {BookServiceService} from "./book-service.service";
import {FormsModule} from "@angular/forms";
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {ChartComponent} from "./Model/chart/chart.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, NgIf, FormsModule, CanvasJSAngularChartsModule, ChartComponent, RouterLink, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  books: Book[] = [];
  title = 'incercareAngular';



  constructor(private router: Router,private bookLibraryService: BookServiceService) {}



}
