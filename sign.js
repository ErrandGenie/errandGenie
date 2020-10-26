// const togglePassword = document.querySelector("#password-field");
// const password = document.querySelector("#password");

// togglePassword.addEventListener("click", function (e) {
//   // toggle the type attribute
//   const type =
//     password.getAttribute("type") === "password" ? "text" : "password";
//   password.setAttribute("type", type);
//   // toggle the eye slash icon
//   this.classList.toggle("fa-eye-slash");
// });

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
