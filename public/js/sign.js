const passwordToggle = document.querySelector("#password-field");

passwordToggle.addEventListener("click", function () {
  const password = document.querySelector("#password");

  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
  this.classList.toggle("fa-eye-slash");
});

var password = document.getElementById("password"),
  confirm_password = document.getElementById("confirm_password");

function validatePassword() {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity("");
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
