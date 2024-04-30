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
