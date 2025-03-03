import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import { Book } from '../../Model/Book/Book';
import { BookServiceService } from '../../book-service.service';
import {FormsModule} from "@angular/forms";
import {ChartComponent} from "../../Model/chart/chart.component";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ChartComponent,
    RouterOutlet,
    NgForOf,
    AsyncPipe,
    NgIf,
    NgStyle
  ],
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  books: Observable<Book[]>;
  title = 'incercareAngular';
  booksLength: number = 0;
  isConnected: boolean = false;
  constructor(private router: Router, private bookLibraryService: BookServiceService) {


  }

  ngOnInit(): void {
    this.getBooks();
    this.checkApiConnection();
  }

  checkApiConnection(): void {
    this.bookLibraryService.checkApiConnection().subscribe(
      () => {
        console.log('API Connection is successful');
        //alert("API Connection is successful.")
        this.isConnected = true;
      },
      (error) => {
        console.error('API Connection Error:', error);
        //alert("API cannot be reach.")
        this.isConnected = false;
      }
    );
  }

  getBooks(): void {
    this.books = this.bookLibraryService.getBooks();
  }

  getlength():any{
    return this.booksLength;
  }
  addBook(form: any): void {
    const title = form.value.title;
    const author = form.value.author;
    const noPages = form.value.noPages;

    if (title && author && noPages) {
      this.bookLibraryService.addBook(title, author, noPages);
      form.reset();
      this.getBooks();
      this.booksLength++;// Refresh book list after adding
    } else {
      alert('Please provide all three items: Title, Author, and Number of Pages.');
    }
    this.getBooks();
  }

  deleteBook(title: string): void {
    this.bookLibraryService.deleteBook(title);

    if (this.bookLibraryService.sorted) {
      this.filter();
    }
    this.getBooks(); // Refresh book list after deletion
  }

  updateBook(book: Book, updateForm: any): void {
    const newTitle = updateForm.value.updateTitle || book.bookTitle;
    const newAuthor = updateForm.value.updateAuthor || book.author;
    const newNoPages = updateForm.value.updateNoPages || book.noOfPages;

    this.bookLibraryService.updateBook(book, newTitle, newAuthor, newNoPages);
    updateForm.reset();
    this.getBooks(); // Refresh book list after update
  }

  filter(): void {
    // Implement sorting logic here if needed
  }

  navigateToOpenPage(): void {
    this.router.navigate(['/open-page']);
  }

  generateRandomBooks(numberOfBooks: number): void {
    this.bookLibraryService.generateRandomBooks(numberOfBooks).subscribe(
      () => {
        console.log(`${numberOfBooks} random books generated successfully`);
        // Optionally, perform any actions after generating random books
      },
      (error) => {
        console.error('Error generating random books:', error);
        // Optionally, handle errors
      }
    );
  }

}
