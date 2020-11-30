// importing modules
const express = require("express");
const router = express.Router();
const passport = require("passport");

// importing User Schema
const User = require("../model/user");

router.get("/", (req, res) => {
  res.render("index", { title: "Errand Genie: Home", css: "css/style.css" });
});

router.get("/contact-us", (req, res) => {
  res.render("contact-us", { title: "Contact Us", css: "css/style.css" });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "About Us", css: "css/about.css" });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/errandGenie",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect to dashboard.

    res.redirect("/dashboard");
  }
);

router.get("/login", (req, res) => {
  res.render("login", { title: "login", css: "css/sign.css" });
});

router.get("/sign-up", (req, res) => {
  res.render("sign-up", { title: "sign-up", css: "css/sign.css" });
});

router.get("/dashboard", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("dashboard", {
      title: "dashboard",
      user: req.user.username,
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.post("/register", (req, res) => {
  User.register(
    { username: req.body.username, email: req.body.email },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.redirect("/sign-up");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/dashboard");
        });
      }
    }
  );
});

router.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    email: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
      res.redirect("/login");
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/dashboard");
      });
    }
  });
});
module.exports = router;
