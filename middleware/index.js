// importing User Schema
const User = require("../model/user");

const middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  if (req["headers"]["content-type"] === "application/json") {
    return res.send({ error: "Login required" });
  }
  // req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");
};

middlewareObj.isNotVerified = async function(req, res, next){
    try {
        const user = await User.findOne({username: req.body.username});
        if (user.isVerified) {
          return next();
        }
        // req.flash("error", "Your account has not been verified. Please check your email to verify your account");
        console.log(error)
    } catch (error) {
        console.log(error)
      // req.flash("error", "We're terribly sorry, something went wrong. Please contact our support team.")
      res.redirect("/sign-up");
    }
}

module.exports = middlewareObj;