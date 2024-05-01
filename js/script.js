function Book(title, author, pageCount, hasRead) {
  Book.nextId = (Book.nextId || 0) + 1;

  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.hasRead = hasRead;
  this.onDisplay = false;
  this.id = Book.nextId;
}

function createBookCard(book, myLibrary) {
  //create elements
  const bookList = document.querySelector("#book-list");
  const bookEntry = document.createElement("ul");
  //nest elements
  bookList.appendChild(bookEntry);
  //style elements
  bookEntry.classList.add("book");
  //add book to DOM
  for (const key in book) {
    if (key === "onDisplay" || key === "id") continue;

    const listItem = document.createElement("li");
    if (key === "hasRead") {
      addHasReadButton(book, myLibrary, listItem);
    }
    else listItem.textContent = book[key];
    bookEntry.appendChild(listItem);
  }
  addRemoveButton(book, myLibrary, bookEntry);
}

function addRemoveButton(book, myLibrary, bookEntry) {
  //make remove button
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("removeBtn");
  removeBtn.addEventListener("click", function() {
    bookEntry.remove();
    for (let  i = 0; i < myLibrary.length; i++) {
      if (book.id === myLibrary[i].id) {
        myLibrary.splice(i, 1);
        break;
      }
    }
  })
  //append remove button
  const btnListItem = document.createElement("li");
  btnListItem.appendChild(removeBtn);
  bookEntry.appendChild(btnListItem);
}

function addHasReadButton(book, myLibrary, listItem) {
  const hasReadButton = document.createElement("button");

  if (book.hasRead == true) {
    hasReadButton.textContent = "Has read";
    hasReadButton.classList.add("has-read");
  }
  else {
    hasReadButton.textContent = "Has not read";
    hasReadButton.classList.add("has-not-read");
  }

  hasReadButton.addEventListener("click", function() {
    //toggle myLibrary book
    for (let libraryBook in myLibrary) {
      if (myLibrary[libraryBook].id = book.id) {
        myLibrary[libraryBook].hasRead = !myLibrary[libraryBook].hasRead;
      }
      break;
    }
    //toggle DOM book
    if (hasReadButton.textContent == "Has read") {
      hasReadButton.textContent = "Has not read";
      hasReadButton.classList.add("has-not-read");
      hasReadButton.classList.remove("has-read");
    }
    else {
      hasReadButton.textContent = "Has read";
      hasReadButton.classList.add("has-read");
      hasReadButton.classList.remove("has-not-read");
    }
  })

  listItem.appendChild(hasReadButton);
}

function addBookToLibrary(myLibrary, book) {
  myLibrary.push(book);
}

function displayLibrary(myLibrary) {
  for(const book in myLibrary) {
    if (myLibrary[book].onDisplay === true) continue;
    createBookCard(myLibrary[book], myLibrary);
    myLibrary[book].onDisplay = true;
  }
}

function updateBookForm(myLibrary, bookForm) {
  const formData = new Book(
    bookForm.title.value, 
    bookForm.author.value, 
    bookForm["page-count"].value, 
    Boolean(+bookForm["has-read"].value)
  );
  
  //reset form
  bookForm.title.value = "";
  bookForm.author.value = "";
  bookForm["page-count"].value = ""; 
  bookForm["has-read"].checked = false;

  addBookToLibrary(myLibrary, formData);
  displayLibrary(myLibrary);
}

function runPage() {
  const myLibrary = [];

  //inserts generic book entry to start list
  const genericBook1 = new Book("Tao te Ching", "Lao Tsu", "110", true);
  const genericBook2 = new Book("The Myth of Sisyphus", "Albert Camus", "138", false);
  addBookToLibrary(myLibrary, genericBook1);
  addBookToLibrary(myLibrary, genericBook2);
  displayLibrary(myLibrary);

  const bookForm = document.querySelector("#book-form");
  bookForm.addEventListener("submit", function(event) {
    event.preventDefault();
    updateBookForm(myLibrary, bookForm);
  });
}


runPage();