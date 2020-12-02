// importing modules
const express = require("express");
const router = express.Router();
const passport = require("passport"),
  sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const crypto = require("crypto"),
  { isLoggedIn, isNotVerified } = require("../middleware/index"),
  flash = require("connect-flash");


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

router.get("/dashboard",isLoggedIn, (req, res) => {
 res.render("dashboard", {
   title: "dashboard",
   user: req.user.username,
 });
});

router.get("/movement",isLoggedIn, (req, res) => {
  res.render("movement", {
    title: "movement",
    user: req.user.username,
  });
});

router.get("/errands",isLoggedIn, (req, res) => {
 res.render("market-shopping", {
   title: "Errands: market shopping",
   user: req.user.username,
 });
});

router.get("/delivery", (req, res) => {
   res.render("delivery", {
     title: "delivery",
     user: req.user.username,
   });
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/login");
});

router.post("/register", async(req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    emailToken: crypto.randomBytes(64).toString('hex'),
    isVerified: false,
  });
  User.register(newUser,req.body.password,async(err, user) => {
      if (err) {
        req.flash("error", err.message);
        res.redirect("/sign-up");
      } else {
        // passport.authenticate("local")(req, res, function () {
        //   res.redirect("/dashboard");
        // });
        const msg = {
          from: "errandgenie233@gmail.com",
          to: newUser.email,
          subject: "errandGenie - Email Verification",
          text: `
            Hello, thanks for registering on Errand Genie.
            Please copy and paste the address below in a new tab to verify your account.
            http://${req.headers.host}/verify-email?token=${newUser.emailToken}
          `,
          html: `
            <h1>Hello</h1>
            <p>Thanks for registering on Errand Genie.</p>
            <p>Please click on the link below to verify your account.</p>
            <a href="http://${req.headers.host}/verify-email?token=${newUser.emailToken}">Verify Your Account</a>
          `,
        };
        try {
          await sgMail.send(msg);
          req.flash("success", "Thanks for registering. Please check your email to verify your account.");
          res.redirect("/sign-up");
        } catch (error) {
          console.log(error);
          req.flash("error", "We're terribly sorry, something went wrong. Please contact our support team.")
          res.redirect("/sign-up")
        }

      }
    }
  );
});

//Email verification route
router.get("/verify-email", async(req, res, next)=>{
  try{
    const user = await User.findOne({ emailToken: req.query.token });
    if (!user) {
      req.flash("error", "Token is invalid. Please contact our support team.");
      return res.redirect("/sign-up");
    }
    user.emailToken = null;
    user.isVerified = true;
    await user.save();
    req.flash("success", "Successfully verified email");
    res.redirect("/login");
  }catch{
    console.log(error);
          req.flash("error", "We're terribly sorry, something went wrong. Please contact our support team.")
          res.redirect("/sign-up")
  }
})

router.post("/login",isNotVerified, function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/dashboard");
      });
    }
  });
});

module.exports = router;
