import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { BookServiceService } from "../../book-service.service";
import {map, Observable, Subscription} from 'rxjs';
import {Book} from "../Book/Book";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  standalone: true,
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  private books: Observable<Book[]>;
  private chart: any = null;
  private subscription: Subscription;

  constructor(private bookService: BookServiceService) {

  }

  ngAfterViewInit() {
    this.books = this.bookService.getBooks();
    this.createChart();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private createChart() {
    this.books.pipe(
      map(books => {
        const labels = books.map(book => book.bookTitle);
        const data = books.map(book => book.noOfPages);

        const backgroundColors = books.map(book => {
          if (book.noOfPages <= 100) {
            return 'rgba(218, 177, 182, 0.5)'; // Red for books under 100 pages
          } else if (book.noOfPages <= 300) {
            return 'rgba(199, 150, 157, 0.5)'; // Blue for books between 101 and 300 pages
          } else {
            return 'rgba(164, 101, 116, 0.5)'; // Yellow for books above 300 pages
          }
        });

        const borderColors = books.map(book => {
          if (book.noOfPages <= 100) {
            return 'rgb(218, 177, 182,0.5)'; // Red for books under 100 pages
          } else if (book.noOfPages <= 300) {
            return 'rgb(199, 150, 157,0.5)'; // Blue for books between 101 and 300 pages
          } else {
            return 'rgb(164, 101, 116,0.5)'; // Yellow for books above 300 pages
          }
        });

        return { labels, data, backgroundColors, borderColors };
      })
    ).subscribe(chartData => {
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: chartData.labels,
          datasets: [{
            label: 'Number of pages',
            data: chartData.data,
            backgroundColor: chartData.backgroundColors,
            borderColor: chartData.borderColors,
            borderWidth: 0.7
          }]
        },
        options: {
          // If needed, you can still customize options for pie chart here
        }
      });
    });
  }

  private updateChart(): void {
    if (this.chart) {
      this.books.pipe(
        map(books => {
          const labels = books.map(book => book.bookTitle);
          const data = books.map(book => book.noOfPages);

          const backgroundColors = books.map(book => {
            if (book.noOfPages <= 100) {
              return 'rgba(218, 177, 182, 0.5)'; // Red for books under 100 pages
            } else if (book.noOfPages <= 300) {
              return 'rgba(199, 150, 157, 0.5)'; // Blue for books between 101 and 300 pages
            } else {
              return 'rgba(164, 101, 116, 0.5)'; // Yellow for books above 300 pages
            }
          });

          const borderColors = books.map(book => {
            if (book.noOfPages <= 100) {
              return 'rgb(218, 177, 182,0.5)'; // Red for books under 100 pages
            } else if (book.noOfPages <= 300) {
              return 'rgb(199, 150, 157,0.5)'; // Blue for books between 101 and 300 pages
            } else {
              return 'rgb(164, 101, 116,0.5)'; // Yellow for books above 300 pages
            }
          });

          return { labels, data, backgroundColors, borderColors };
        })
      ).subscribe(chartData => {
        this.chart.data.labels = chartData.labels;
        this.chart.data.datasets[0].data = chartData.data;
        this.chart.data.datasets[0].backgroundColor = chartData.backgroundColors;
        this.chart.data.datasets[0].borderColor = chartData.borderColors;
        this.chart.update();
      });
    }
  }

}
