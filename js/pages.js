function myFunction(x) {
  x.classList.toggle("change");
}

function newInput() {
  const address = document.querySelector("div.address");
  const input = document.createElement("input");
  input.classList.add("form-control");
  input.setAttribute("id", "inputAddress");
  input.setAttribute("placeholder", "Sakaman, Blue-Lagoon Street");
  address.appendChild(input);
}
