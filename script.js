let localStorage = window.localStorage;
let bookTableBody = document.getElementById('bookTableBody');
let bookForm = document.getElementById('bookForm');

class Book {
  constructor(title, author, pages, readed) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readed = readed;
  }
}

function getLibrary() {
  return JSON.parse(localStorage.getItem('library')) || [];
}

function displayBooks() {
  bookTableBody.innerHTML = '';
  let library = getLibrary();
  library.forEach((book, index) => {
    let row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
                     <td>${book.author}</td>
                     <td>${book.pages}</td>
                     <td>
                      ${book.readed}
                      <button class="btn btn-warning change-reading-btn ml-3">
                        <i class="fas fa-exchange-alt no-click"></i>
                      </button>
                    </td>
                     <td><button class="btn btn-danger delete-book-btn">
                        <i class="fas fa-trash no-click"></i>
                     </button></td>`;
    row.setAttribute('data-index', index);
    let deleteBookBtn = row.querySelector('.delete-book-btn');
    deleteBookBtn.addEventListener('click', deleteBook);
    let changeReadingBtn = row.querySelector('.change-reading-btn');
    changeReadingBtn.addEventListener('click', changeReadingStatus);
    bookTableBody.appendChild(row);
  });
}

function addBookToLibrary(e) {
  let title = document.getElementById('bookTitle').value;
  let author = document.getElementById('bookAuthor').value;
  let pages = document.getElementById('bookPages').value;
  let readed = document.querySelector('input[name="readed"]:checked').value;
  let book = new Book(title, author, pages, readed);
  let library = getLibrary();
  library.push(book);
  localStorage.setItem('library', JSON.stringify(library));
  displayBooks();
  bookForm.reset();
  e.preventDefault();
}

function deleteBook(e) {
  let domBookToDelete = e.target.parentElement.parentElement;
  let bookToDeleteIndex = parseInt(
    domBookToDelete.getAttribute('data-index'),
    10
  );
  let library = getLibrary();
  library = library.filter((book, index) => index !== bookToDeleteIndex);
  localStorage.setItem('library', JSON.stringify(library));
  displayBooks();
}

function changeReadingStatus(e) {
  let domBook = e.target.parentElement.parentElement;
  let bookIndex = parseInt(domBook.getAttribute('data-index'), 10);
  let library = getLibrary();
  let book = library[bookIndex];
  book.readed = book.readed === 'Yes' ? 'No' : 'Yes';
  localStorage.setItem('library', JSON.stringify(library));
  displayBooks();
}

// Events

window.addEventListener('DOMContentLoaded', displayBooks);
bookForm.addEventListener('submit', addBookToLibrary);
