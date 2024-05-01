const myLibrary = [];

function Book(title, author, pageCount, hasRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.hasRead = hasRead;
}

Book.prototype.info = function() {
  if (this.hasRead === true) {
    return this.title + " by " + this.author + 
           ", " + this.pageCount + " pages, has been read"; 
  }
  else {
    return this.title + " by " + this.author + 
           ", " + this.pageCount + " pages, has not been read"; 
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

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

  createBookCard(formData);

  console.log(formData.info());
})

function createBookCard(book) {
  //create elements
  const bookEntry = document.createElement("ul");
  const bookEntryContainer = document.createElement("div");
  const bookList = document.querySelector("#book-list");
  const removeBtn = document.createElement("button");
  //nest elements
  bookEntryContainer.appendChild(bookEntry); 
  bookList.appendChild(bookEntryContainer);
  //style elements
  bookEntryContainer.classList.add("book");
  removeBtn.textContent = "Remove";

  for (const key in book) {
    if (key === "info") continue;
    
    const listItem = document.createElement("li");
    if (key === "hasRead") {
      listItem.textContent = book[key] == true ? "Has read" : "Has not read";
    }
    else listItem.textContent = book[key];
    bookEntry.appendChild(listItem);
  }
  bookEntry.appendChild(removeBtn);
}