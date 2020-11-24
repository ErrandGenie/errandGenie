const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { title: "Errand Genie: Home", css: "css/style.css" });
});

app.get("/contact-us", (req, res) => {
  res.render("contact-us", { title: "Contact Us", css: "css/style.css" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Us", css: "css/about.css" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "login", css: "css/pages.css" });
});

app.get("/sign-up", (req, res) => {
  res.render("sign-up", { title: "sign-up", css: "css/pages.css" });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", { title: "dashboard", css: "css/pages.css" });
});

app.get("/movement", (req, res) => {
  res.render("movement", { title: "movement", css: "css/pages.css" });
});

app.get("/errands-main", (req, res) => {
  res.render("errands-main", { title: "errands-main", css: "css/pages.css" });
});

app.get("/delivery", (req, res) => {
  res.render("delivery", { title: "delivery", css: "css/pages.css" });
});

app.get("/market-shopping", (req, res) => {
  res.render("market-shopping", { title: "market-shopping", css: "css/pages.css" });
});

app.get("/personal-errands", (req, res) => {
  res.render("personal-errands", { title: "personal-errands", css: "css/pages.css" });
});

app.get("/corporate-errands", (req, res) => {
  res.render("corporate-errands", { title: "corporate-errands", css: "css/pages.css" });
});

const port = process.env.PORT || 8000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started on port 8000");
  }
});
