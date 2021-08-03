document.addEventListener("DOMContentLoaded", function () {
  const submit = document.querySelector("#bookSubmit");
  submit.addEventListener("click", function (event) {
    event.preventDefault();
    addList();
    resetForm();
  });
  if (checkStorage()) {
    loadDataFromStorage();
  }
  const search = document.querySelector("#searchSubmit");
  const cariJudul = document.querySelector("#searchBookTitle");
  search.addEventListener("click", function (event) {
    event.preventDefault();
    if (cariJudul.value != "") {
      findByJudul(cariJudul.value);
    } else {
      removeArticle();
      refreshDataFromBooks();
    }
  });
});
