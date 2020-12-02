require("dotenv").config();
const express = require("express"),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      { urlencoded } = require("body-parser"),
      passport = require("passport"),
      session = require("express-session"),
      passportLocalMongoose = require("passport-local-mongoose"),
      GoogleStrategy = require("passport-google-oauth20").Strategy,
      findOrCreate = require("mongoose-findorcreate"),
      sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const crypto = require("crypto"),
{isNotVerified} = require("./middleware");
    flash = require("connect-flash");

const app = express();

//------------ EJS Configuration ------------//
app.set("view engine", "ejs");
app.use(express.static("public"));

//------------ Bodyparser Configuration ------------//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(flash());

//------------ Express session Configuration ------------//
app.use(
  session({
    secret: "you are all going to die oneday, why behave like you won't.",
    resave: false,
    saveUninitialized: false,
  })
);

//------------ Passport Middlewares ------------//
app.use(passport.initialize());
app.use(passport.session());

//------------ Mongo Connection ------------//
mongoose.connect("mongodb://localhost:27017/errandGenie", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

//------------ Passport Configuration ------------//
require("./config/passport")(passport);

//------------ flash configuration ------------//
app.use((req, res, next)=>{
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
}) 
//------------ Routes ------------//
app.use("/", require("./route/user"));
app.use("/", require("./route/password"));

//------------ Port ------------//
app.listen(8000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started on port 8000");
  }
});
