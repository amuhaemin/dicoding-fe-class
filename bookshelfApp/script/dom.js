const BOOK_ID = "itemId";
//ubah span belum dibaca
const checkMark = document.querySelector("#inputBookIsComplete");
checkMark.addEventListener("click", function () {
  const buttonText = document.querySelector("#bookSubmit");

  if (checkMark.checked) {
    buttonText.childNodes[1].innerText = "Selesai dibaca";
  } else {
    buttonText.childNodes[1].innerText = "Belum selesai dibaca";
  }
});

//membuat HTML dari data
function catatBuku(judul, penulis, tahun, isComplete) {
  const container = document.createElement("article");
  container.classList.add("book_item");

  const titleBuku = document.createElement("h3");
  const authorBuku = document.createElement("p");
  const yearBuku = document.createElement("p");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("action");

  titleBuku.innerText = judul;
  authorBuku.innerText = penulis;
  yearBuku.innerText = tahun;

  container.append(titleBuku, authorBuku, yearBuku);

  if (isComplete) {
    const belumButton = belumBacaButton();
    belumButton.innerText = "Belum Selesai di Baca";
    buttonContainer.append(belumButton, hapusButton());
  } else {
    const selesaiButton = selesaiBacaButton();
    selesaiButton.innerText = "Selesai di Baca";
    buttonContainer.append(selesaiButton, hapusButton());
  }

  container.append(buttonContainer);
  return container;
}

// add HTML from Form
function addList() {
  const judulBuku = document.querySelector("#inputBookTitle").value;
  const penulisBuku = document.querySelector("#inputBookAuthor").value;
  const tahunBuku = document.querySelector("#inputBookYear").value;
  const isComplete = document.querySelector("#inputBookIsComplete").checked;
  const bukuDOM = catatBuku(judulBuku, penulisBuku, tahunBuku, isComplete);
  const bukuObject = createBookObject(judulBuku, penulisBuku, tahunBuku, isComplete);

  bukuDOM[BOOK_ID] = bukuObject.id;
  books.push(bukuObject);
  if (isComplete) {
    const listSudahBaca = document.querySelector("#completeBookshelfList");
    listSudahBaca.append(bukuDOM);
  } else {
    const listBelumBaca = document.querySelector("#incompleteBookshelfList");
    listBelumBaca.append(bukuDOM);
  }
  updateDataToStorage();
}

//membuat button
function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  if (buttonTypeClass == "red") {
    button.innerText = "Hapus Buku";
  }
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function selesaiBacaButton() {
  return createButton("green", function (event) {
    addBukuSelesaiBaca(event.target.parentElement.parentElement);
  });
}

function hapusButton() {
  return createButton("red", function (event) {
    let question = confirm("Yakin Menghapus Buku ini dari List?");
    if (question) {
      hapusListBuku(event.target.parentElement.parentElement);
    }
  });
}

function belumBacaButton() {
  return createButton("green", function (event) {
    addBukuBelumBaca(event.target.parentElement.parentElement);
  });
}

function addBukuSelesaiBaca(bookElement) {
  const judulBuku = bookElement.childNodes[0].innerText;
  const penulisBuku = bookElement.childNodes[1].innerText;
  const tahunBuku = bookElement.childNodes[2].innerText;

  const newBukuDOM = catatBuku(judulBuku, penulisBuku, tahunBuku, true);
  const book = findBooks(bookElement[BOOK_ID]);
  book.isComplete = true;
  newBukuDOM[BOOK_ID] = book.id;

  const listSudahBaca = document.querySelector("#completeBookshelfList");
  listSudahBaca.append(newBukuDOM);

  bookElement.remove();

  updateDataToStorage();
}

function addBukuBelumBaca(bookElement) {
  const judulBuku = bookElement.childNodes[0].innerText;
  const penulisBuku = bookElement.childNodes[1].innerText;
  const tahunBuku = bookElement.childNodes[2].innerText;

  const newBukuDOM = catatBuku(judulBuku, penulisBuku, tahunBuku, false);
  const book = findBooks(bookElement[BOOK_ID]);
  book.isComplete = false;
  newBukuDOM[BOOK_ID] = book.id;

  const listBelumBaca = document.querySelector("#incompleteBookshelfList");
  listBelumBaca.append(newBukuDOM);

  bookElement.remove();
  updateDataToStorage();
}

function hapusListBuku(bookElement) {
  const bookPosition = findBooksIndex(bookElement[BOOK_ID]);
  books.splice(bookPosition, 1);

  bookElement.remove();
  updateDataToStorage();
}

function resetForm() {
  document.querySelector("#inputBook").reset();
  document.querySelector("#searchBookTitle").innerText = "";
}

function findByJudul(judul) {
  const listBelumBaca = document.getElementById("incompleteBookshelfList");
  const listSudahBaca = document.getElementById("completeBookshelfList");
  let searchList = [];

  for (book of books) {
    if (book.title.includes(judul)) {
      searchList.push(book);
    }
  }
  removeArticle();
  for (search of searchList) {
    const newBukuDOM = catatBuku(search.title, search.author, search.year, search.isComplete);
    newBukuDOM[BOOK_ID] = search.id;

    if (search.isComplete) {
      listSudahBaca.append(newBukuDOM);
    } else {
      listBelumBaca.append(newBukuDOM);
    }
  }
}

function removeArticle() {
  const articles = document.getElementsByClassName("book_item");

  while (articles.length > 0) {
    var article = articles[0];
    article.parentNode.removeChild(article);
  }
}
