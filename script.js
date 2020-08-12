let localStorage = window.localStorage;
let bookTableBody = document.getElementById('bookTableBody');
let bookForm = document.getElementById('bookForm');

function Book(title, author, pages, readed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readed = readed;
}

function getLibrary() {
  return JSON.parse(localStorage.getItem('library')) || [];
}

function displayBooks() {
  bookTableBody.innerHTML = '';
  let library = getLibrary();
  for (let book of library) {
    let row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
                     <td>${book.author}</td>
                     <td>${book.pages}</td>
                     <td>${book.readed}</td>`;
    bookTableBody.appendChild(row);
  }
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

// Events

window.addEventListener('DOMContentLoaded', displayBooks);
bookForm.addEventListener('submit', addBookToLibrary);
