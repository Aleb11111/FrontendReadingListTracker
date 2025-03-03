import { TestBed } from '@angular/core/testing';
import { BookServiceService } from './book-service.service';
import { Book } from './Model/Book/Book';
import {filter} from "rxjs";

describe('BookServiceService', () => {
  let service: BookServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of books', () => {
    const books = service.getBooks();
    expect(books).toBeDefined();
    expect(books.length).toBeGreaterThan(0);
    expect(books.every(book => book instanceof Book)).toBeTrue();
  });

  it('should add a new book', () => {
    const initialLength = service.getBooks().length;
    service.addBook('New Book', 'New Author', 200);
    const books = service.getBooks();
    expect(books.length).toBe(initialLength + 1);
    const newBook = books.find(book => book.BookTile === 'New Book');
    expect(newBook).toBeDefined();
    expect(newBook!.Author).toBe('New Author');
    expect(newBook!.noOfPages).toBe(200);
  });

  it('should delete a book', () => {
    const bookToDelete = service.getBooks()[0];
    service.deleteBook(bookToDelete.BookTile);
    const books = service.getBooks();
    expect(books.some(book => book.BookTile === bookToDelete.BookTile)).toBeFalse();
  });

  it('should update a book', () => {
    const initialBooks = service.getBooks();
    const bookToUpdate = initialBooks[0];
    const newTitle = 'Updated Title';
    const newAuthor = 'Updated Author';
    const newNoPages = 500;
    service.updateBook(bookToUpdate, newTitle, newAuthor, newNoPages);
    const updatedBook = service.getBooks().find(book => book.BookTile === newTitle);
    expect(updatedBook).toBeDefined();
    expect(updatedBook!.Author).toBe(newAuthor);
    expect(updatedBook!.noOfPages).toBe(newNoPages);
  });

  it('Should be sorted', () =>{

    service.addBook("A","B",2)
    service.addBook("W","O",9)
    service.addBook("D","P",3)

    let copy = service.getBooks();
    copy.sort()
    service.filter();
    let result = false;
    for (let i = 0; i < service.getBooks().length; i++) {

      result = service.getBooks()[i] === copy[i];
    }
    expect(result).toBe(false)
  })


});
