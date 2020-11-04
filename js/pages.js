const toggler = document.querySelector("div.dropdown-toggle");

toggler.addEventListener("click", function () {
  var menu = document.querySelector("div.menu");

  if (menu.style.display === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
});

function myFunction(x) {
  x.classList.toggle("change");
}