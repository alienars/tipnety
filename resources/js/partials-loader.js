function loadPartial(id, url) {
  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;
    });
}

document.addEventListener("DOMContentLoaded", function () {
  loadPartial("header", "header.html");
  loadPartial("footer", "footer.html");
});
