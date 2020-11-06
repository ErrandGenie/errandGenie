function myFunction(x) {
  x.classList.toggle("change");
}

function newInput() {
  const address = document.querySelector("div.address");
  const input = document.createElement("input");
  input.classList.add("form-control");
  input.setAttribute("id", "inputAddress");
  input.setAttribute("placeholder", "Sakaman, Blue-Lagoon Street");

  const icon = document.createElement("span");
  icon.classList.add("fas", "fa-trash");
  icon.style.color = "tomato";
  icon.style.right = "20px";
  icon.style.marginTop = "10px";
  icon.style.position = "absolute";

  icon.addEventListener("click", function () {
    input.remove();
    icon.remove();
  });

  address.append(icon);
  address.appendChild(input);
}
