require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const nodemailer = require("nodemailer");

const app = express();

//------------ EJS Configuration ------------//
app.set("view engine", "ejs");
app.use(express.static("public"));

//------------ Bodyparser Configuration ------------//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
// mongoose.connect("mongodb://localhost:27017/errandGenie", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.set("useCreateIndex", true);
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//------------ Passport Configuration ------------//
require("./config/passport")(passport);

//------------ Routes ------------//
app.use("/", require("./route/user"));

//------------ Port ------------//
const PORT = process.env.PORT || 8000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started on port 8000");
  }
});
