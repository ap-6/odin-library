function Book(title, author, pageCount, hasRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.hasRead = hasRead;
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
})

function createBookCard(book) {
  console.log("test");
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
  removeBtn.addEventListener("click", function(event) {
    bookEntryContainer.remove();
  })

  for (const key in book) {
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
  const bookList = document.querySelector("#book-list");
  //inserts generic book entry to start list
  const genericBook = new Book("Tao te Ching", "Lao Tsu", "110", true);
  addBookToLibrary(myLibrary, genericBook);
  createBookCard(genericBook);
}

function addBookToLibrary(myLibrary, book) {
  myLibrary.push(book);
}

runPage();