const STORAGE_KEY = "BOOK_SHELF";

let books = [];

function checkStorage() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  console.log("Data berhasil disimpan.");
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    books = data;
  }
  refreshDataFromBooks();
}

function updateDataToStorage() {
  if (checkStorage()) {
    saveData();
  }
}

function createBookObject(title, author, year, isComplete) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  };
}

function findBooks(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

function findBooksIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;

    index++;
  }

  return -1;
}

function refreshDataFromBooks() {
  const listBelumBaca = document.getElementById("incompleteBookshelfList");
  let listSudahBaca = document.getElementById("completeBookshelfList");

  for (book of books) {
    const newBukuDOM = catatBuku(book.title, book.author, book.year, book.isComplete);
    newBukuDOM[BOOK_ID] = book.id;

    if (book.isComplete) {
      listSudahBaca.append(newBukuDOM);
    } else {
      listBelumBaca.append(newBukuDOM);
    }
  }
}
