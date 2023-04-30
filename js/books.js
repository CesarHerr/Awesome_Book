/* eslint-disable max-classes-per-file */

const booksTable = document.getElementById('books-table');
const addBooksForm = document.getElementById('add-books-form');
const addBookBtn = document.getElementById('add-book-btn');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  addBook(title, author) {
    const book = new Book(title, author);
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  removeBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  displayBooks() {
    booksTable.innerHTML = this.books
      .map(
        (book, index) => `
      <tr>
        <td> "${book.title}" by ${book.author}</td>    
        <td><button class='remove-book-btn' data-book-index=${index}>Remove</button></td>
      </tr>
`,
      )
      .join('');
  }

  addRemoveBtnListeners() {
    booksTable.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-book-btn')) {
        const index = event.target.dataset.bookIndex;
        this.removeBook(index);
        this.displayBooks();
      }
    });
  }
}

const library = new Library();

addBookBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const title = addBooksForm.elements.title.value.trim();
  const author = addBooksForm.elements.author.value.trim();

  if (title !== '' && author !== '') {
    library.addBook(title, author);
    library.displayBooks();
    addBooksForm.reset();
  }
});

library.displayBooks();
library.addRemoveBtnListeners();

// nav bar

const main = document.querySelector('body');
const createNavBar = document.createElement('div');
createNavBar.classList.add('nav-bar');

createNavBar.innerHTML = `  
  <h3>Awesome Books</h3>   
  <nav>
    <ul>
      <li><button class="list-btn">List</button></li>
      <li><button class="add-btn">Add new</button></li>
      <li><button class="contact-btn">Contact</button></li>
    </ul>
  </nav>  
    `;
main.insertAdjacentElement('afterbegin', createNavBar);

const createDate = document.createElement('p');
createDate.classList.add('date');

createNavBar.insertAdjacentElement('afterend', createDate);

const createContact = document.createElement('div');
createContact.classList.add('contact');

createContact.innerHTML = `
    <h2>Contact Information</h2>
    <p>Do you have any questions or you just want to say "Hello"? <br> you can reach out to us!</p>
    <ul>
      <li>Our e-mail: mail@mail.com</li>
      <li>Our phone number: 0043586534422</li>
      <li>Our address: Street name 22, 84503 City, Country</li>
    </ul>
  `;
main.appendChild(createContact);

const createFooter = document.createElement('footer');

createFooter.innerHTML = `
  <h4>Copyright  ...</h4>  
  `;
main.appendChild(createFooter);

const listButton = document.querySelector('.list-btn');
const addButton = document.querySelector('.add-btn');
const contactButton = document.querySelector('.contact-btn');

const libraryBooks = document.querySelector('.library');
const addingBooks = document.querySelector('.books-form');
const contactInfo = document.querySelector('.contact');

listButton.addEventListener('click', () => {
  addingBooks.style.display = 'none';
  libraryBooks.style.display = 'inline';
  contactInfo.style.display = 'none';
  createDate.innerHTML = Date();
});

addButton.addEventListener('click', () => {
  addingBooks.style.display = 'inline';
  libraryBooks.style.display = 'none';
  contactInfo.style.display = 'none';
  createDate.innerHTML = Date();
});

contactButton.addEventListener('click', () => {
  addingBooks.style.display = 'none';
  libraryBooks.style.display = 'none';
  contactInfo.style.display = 'inline';
  createDate.innerHTML = Date();
});

createDate.innerHTML = Date();
