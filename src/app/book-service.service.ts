import { Injectable } from '@angular/core';
import { Book } from "./Model/Book/Book";
import {catchError, Observable, Subject, tap, throwError} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  private books: Book[] = [];
  booksChanged = new Subject<Book[]>();
  sorted:boolean=false;
  private baseURL = "http://localhost:8080/api/books"
  constructor(private http: HttpClient, private router: Router) {
    // let book = new Book(1, 'Fourth Wing', 'Rebbeca Yarros', 321);
    // let book2 = new Book(2, 'Ion', 'Liviu Rebreanu', 248);
    // let book3 = new Book(3, 'A Game of Thrones', 'George R. R. Martin', 912);
    // let book4 = new Book(4, 'The Two Towers', 'J. R. R. Tolkien', 452);
    // let book5 = new Book(5, 'Caraval', 'Stephanie Garber', 97);
    // this.books.push(book, book2, book3, book4, book5);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseURL}`).pipe(
      tap((books: Book[]) => {
        console.log('Received books:', books); // Log received books
        this.books = books.slice(); // Update the local books array with a copy
        this.booksChanged.next(this.books); // Emit the updated books data
      }),
      catchError((error: any) => {
        console.error('Error fetching books: ', error);
        return throwError(error); // Forward the error
      })
    );
  }

  checkApiConnection(): Observable<any> {
    return this.http.get<any>(this.baseURL).pipe(
      tap(() => console.log('API Connection Successful')),
      catchError((error: any) => {
        console.error('API Connection Error:', error);
        return throwError(error);
      })
    );
  }

  addBook(title: string, author: string, noPages: number): void {
    const newBook = {
      bookTitle: title,
      author: author,
      noOfPages: noPages
    };

    this.http.post(this.baseURL, newBook).subscribe(
      () => {
        console.log('Book added successfully');
        alert('')
      },
      (error) => {
        console.error('Error adding book:', error);
        alert('Book not added, you inserted a banned book!');
      }
    );

  }

  deleteBook(title: string): void {
    // Send HTTP DELETE request to delete the book by title from the backend
    this.http.delete(`${this.baseURL}/${title}`).subscribe(
      () => {
        console.log('Book deleted successfully');
        this.router.navigateByUrl(this.router.url);
        // Update local data after successful deletion
        this.books = this.books.filter(book => book.bookTitle !== title);
        // Emit the updated books data
        this.booksChanged.next(this.books.slice());
      },
      (error) => {
        console.error('Error deleting book:', error);
        // Handle error here, e.g., display an error message
      }
    );
  }

  updateBook(oldBook: Book, newTitle: string, newAuthor: string, newNoPages: number): void {
    // Create an updated book object
    const updatedBook: Book = { ...oldBook, bookTitle: newTitle, author: newAuthor, noOfPages: newNoPages };

    // Send an HTTP PUT request to update the book details on the backend
    this.http.put(`${this.baseURL}/${oldBook.bookTitle}`, updatedBook).subscribe(
      () => {
        console.log('Book updated successfully');
        // Emit the updated books data
        this.getBooks().subscribe(books => {
          this.booksChanged.next(books); // Emit the updated books array
        });
      },
      (error) => {
        console.error('Error updating book:', error);
        // Handle error here, e.g., display an error message
      }
    );
  }

  filter(): void {
    this.sorted=true;
    this.books.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle));

  }

  generateRandomBooks(numberOfBooks: number): Observable<void> {
    return this.http.post<void>(`${this.baseURL}/generate-random-books`, numberOfBooks);
  }

}
