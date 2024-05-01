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
  const bookEntryContainer = document.createElement("div");
  const removeBtn = document.createElement("button");
  //nest elements
  bookEntryContainer.appendChild(bookEntry); 
  bookList.appendChild(bookEntryContainer);
  //style elements
  bookEntryContainer.classList.add("book");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", function() {
    bookEntryContainer.remove();
    for (let  i = 0; i < myLibrary.length; i++) {
      if (book.id === myLibrary[i].id) {
        myLibrary.splice(i, 1);
        break;
      }
    }
  })

  for (const key in book) {
    if (key === "onDisplay" || key === "id") continue;

    const listItem = document.createElement("li");
    if (key === "hasRead") {
      listItem.textContent = book[key] == true ? "Has read" : "Has not read";
    }
    else listItem.textContent = book[key];
    bookEntry.appendChild(listItem);
  }
  bookEntry.appendChild(removeBtn);
}

function runPage() {
  const myLibrary = [];

  //inserts generic book entry to start list
  const genericBook = new Book("Tao te Ching", "Lao Tsu", "110", true);
  addBookToLibrary(myLibrary, genericBook);
  displayLibrary(myLibrary);

  const bookForm = document.querySelector("#book-form");

  bookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new Book(
      bookForm.title.value, 
      bookForm.author.value, 
      bookForm["page-count"].value, 
      bookForm["has-read"].checked
    );
    
    //reset form
    bookForm.title.value = "";
    bookForm.author.value = "";
    bookForm["page-count"].value = ""; 
    bookForm["has-read"].checked = false;

    addBookToLibrary(myLibrary, formData);
    displayLibrary(myLibrary);
  })
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

runPage();