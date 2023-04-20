function Book(title, author, pages, read) {
  // Constructor for the object Books
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} written by ${this.author}, ${this.pages} pages, ${this.read}.`;
};

const library = [];

const booksContainer = document.querySelector(".books");

function showBooks(array) {
  while (booksContainer.firstChild) {
    booksContainer.removeChild(booksContainer.firstChild);
  }
  for (const book of array) {
    const bookDiv = document.createElement("div");
    bookDiv.className = "bookCard";
    bookDiv.innerHTML = `<h2>${book.title}</h3><h3>Written by ${book.author}</h3><h3>${book.pages} Pages</h3>`;
    const bookDivButtons = document.createElement("div");
    bookDivButtons.className = "bottom-buttons";

    const readStatus = document.createElement("div");
    readStatus.className = "read-status";
    readStatus.innerHTML =
      // eslint-disable-next-line quotes
      `<svg data-read="${book.read}" class="read-button" width="40px" height="40px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="lightgrey" d="M204.055 213.905q-18.12-5.28-34.61-9a145.92 145.92 0 0 1-6.78-44.33c0-65.61 42.17-118.8 94.19-118.8 52.02 0 94.15 53.14 94.15 118.76a146.3 146.3 0 0 1-6.16 42.32q-20.52 4.3-43.72 11.05c-22 6.42-39.79 12.78-48.56 16.05-8.72-3.27-26.51-9.63-48.51-16.05zm-127.95 84.94a55.16 55.16 0 1 0 55.16 55.15 55.16 55.16 0 0 0-55.16-55.15zm359.79 0a55.16 55.16 0 1 0 55.16 55.15 55.16 55.16 0 0 0-55.15-55.15zm-71.15 55.15a71.24 71.24 0 0 1 42.26-65v-77.55c-64.49 0-154.44 35.64-154.44 35.64s-89.95-35.64-154.44-35.64v74.92a71.14 71.14 0 0 1 0 135.28v7c64.49 0 154.44 41.58 154.44 41.58s89.99-41.55 154.44-41.55v-9.68a71.24 71.24 0 0 1-42.26-65z"/></svg>`;
    bookDiv.appendChild(readStatus);
    const deleteBookButton = document.createElement("button");
    deleteBookButton.className = "delete-book-button";
    deleteBookButton.dataset.id = `${array.indexOf(book)}`;
    deleteBookButton.innerHTML =
      // eslint-disable-next-line quotes
      '<img src="./img/delete.svg" alt="Delete button" height="30px" width="30px"/>';
    bookDivButtons.appendChild(deleteBookButton);
    bookDiv.appendChild(bookDivButtons);
    booksContainer.appendChild(bookDiv);
  }
  setColor();
}

function addBookToLibrary(title, author, pages, read) {
  // Function to add a book to the library
  const newBook = new Book(title, author, pages, read);
  library.push(newBook);
  // eslint-disable-next-line no-plusplus
}

function removeBookFromLibrary(index) {
  // Function to remove a book from the library
  library.splice(index, 1);
  showBooks(library); // It is required to run this function to update the library
  updateSelector(); // This function has to be run to guarantee the update of the NodeList.
}

addBookToLibrary(
  "Harry Potter y la Piedra Filosofal",
  "JK Rowling",
  "300",
  "true"
);
addBookToLibrary(
  "Cien años de Soledad",
  "Gabriel García Marquez",
  "2500",
  "false"
);
addBookToLibrary(
  "El Coronel no tiene quien le escriba",
  "Gabriel Garcia Marquez",
  "300",
  "true"
);

showBooks(library);

const toggleForm = document.querySelector(".bookForm"); // This selector choses the class bookForm which we'll display when asked.
const addBookButton = document.querySelector(".addBookButton"); // This selector choses the '+' button in the bottom right of the page. That button is used to add a book to the library.
addBookButton.addEventListener("click", () => {
  // This function shows the form to add a new book.
  toggleForm.style.display = "block";
});

const addBookForm = document.getElementById("addBookForm");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

const closeFormButton = document.querySelector(".closeForm");
closeFormButton.addEventListener("click", () => {
  // This function closes the form to add a new book without adding a book.
  toggleForm.style.display = "none";
});

const bookNameSelector = document.getElementById("bookName"); // Selector for the Id bookName from the form
let bookName;
bookNameSelector.addEventListener("input", (event) => {
  bookName = event.target.value;
});

const bookAuthorSelector = document.getElementById("bookAuthor"); // Selector for the Id bookAuthor from the form
let bookAuthor;
bookAuthorSelector.addEventListener("input", (event) => {
  bookAuthor = event.target.value;
});

const bookPagesSelector = document.getElementById("bookPages"); // Selector for the Id bookPages from the form
let bookPages;
bookPagesSelector.addEventListener("input", (event) => {
  bookPages = event.target.value;
});

const bookReadSelector = document.querySelectorAll("input[type='radio']"); // Selector for the Id bookPages from the form
let bookRead;
bookReadSelector.forEach((radioButton) => {
  radioButton.addEventListener("click", (event) => {
    bookRead = event.target.value;
  });
});

function updateSelector() {
  // This function updates the Nodelist every time a new book is added or deleted.
  const removeSelector = document.querySelectorAll(".delete-book-button");
  removeSelector.forEach((button) => {
    button.addEventListener("click", () => {
      removeBookFromLibrary(button.dataset.id);
    });
  });
}

updateSelector();

const addBookSelector = document.getElementById("addBookFormButton"); // Selector for the 'Add book' button of the form
addBookSelector.addEventListener("click", () => {
  // Function used to add a Book to the library when the user clicks the 'Add book' button
  if (
    bookName !== undefined &&
    bookRead !== undefined &&
    bookPages !== undefined &&
    bookRead !== undefined
  ) {
    // Check if the user readed the book or not and then adds the book to the Library and refreshes the library.
    if (bookRead === "true") {
      addBookToLibrary(bookName, bookAuthor, bookPages, "true");
      showBooks(library);
      toggleForm.style.display = "none";
      bookName = undefined;
      bookAuthor = undefined;
      bookPages = undefined;
      bookRead = undefined;
      document.getElementById("addBookForm").reset();
      updateSelector();
    } else {
      addBookToLibrary(bookName, bookAuthor, bookPages, "false");
      showBooks(library);
      toggleForm.style.display = "none";
      bookName = undefined;
      bookAuthor = undefined;
      bookPages = undefined;
      bookRead = undefined;
      document.getElementById("addBookForm").reset();
      updateSelector();
    }
  }
});

function setColor() {
  // This function sets the starting color for the Read button depending if the user readed the book or not.
  const selectReadButton = document.querySelectorAll(".read-button");
  selectReadButton.forEach((button) => {
    if (button.dataset.read === "true") {
      button.querySelector("path").setAttribute("fill", "#50C878");
    }
  });
  modifyReadButton();
}

function modifyReadButton() {
  // Function used to modify the read status and color of a book.
  const modifyRead = document.querySelectorAll(".read-button");
  modifyRead.forEach((button) => {
    if (button.dataset.read === "true") {
      button.addEventListener("click", () => {
        button.querySelector("path").setAttribute("fill", "lightgrey");
        button.dataset.read = "false";
        setTimeout(modifyReadButton, 1);
      });
    } else {
      button.addEventListener("click", () => {
        button.querySelector("path").setAttribute("fill", "#50C878");
        button.dataset.read = "true";
        setTimeout(modifyReadButton, 10);
      });
    }
  });
}
