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

// document.querySelector("#title");
// document.querySelector("#author");
// document.querySelector("#page-count");
// document.querySelector("#has-read");

const bookForm = document.querySelector("#book-form");
bookForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const formData = {
    title: bookForm.title.value,
    author: bookForm.author.value,
    pageCount: bookForm["page-count"].value,
    hasRead: bookForm["has-read"].checked
  }
  console.log(formData);
})