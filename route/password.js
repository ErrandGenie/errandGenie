const express = require("express");
const router = express.Router();
  sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const crypto = require("crypto"),
  flash = require("connect-flash"),
  async = require("async");

// importing User Schema
const User = require("../model/user");

router.get("/forgot", (req, res) => {
  res.render("forgot", { title: "Forgot Password", css: "css/sign.css" });
});

router.post("/forgot", function (req, res, next) {
  async.waterfall(
    [
      function (done) {
        crypto.randomBytes(20, function (err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function (token, done) {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (!user) {
            req.flash("error", "No account with that email address exists.");
            return res.redirect("/forgot");
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save(function (err) {
            done(err, token, user);
          });
        });
      },
      async function (token, user, done) {
          const msg = {
            from: "errandgenie233@gmail.com",
            to: user.email,
            subject: "errandGenie - Password Reset",
            text: `
            Hello, thanks for registering on Errand Genie.
            Please copy and paste the address below in a new tab to verify your account.
            http://${req.headers.host}/reset/${token}
          `,
            html: `
            <h1>Hello</h1>
            <p>Thanks for registering on Errand Genie.</p>
            <p>Please click on the link below to verify your account.</p>
            <a href="http://${req.headers.host}/reset/${token}">http://${req.headers.host}/reset/${token}</a>
          `,
          };
             try {
          await sgMail.send(msg);
           console.log('mail sent');
        req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done();
        } catch (error) {
          console.log(error);
          req.flash("error", "We're terribly sorry, something went wrong. Please contact our support team.")
          res.redirect("/forgot")
        }
      }
    ],
    function (err) {
      if (err) return next(err);
      res.redirect("/forgot");
    }
  );
});

router.get("/reset/:token", function (req, res) {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    function (err, user) {
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        return res.redirect("/forgot");
      }
      res.render("reset", {title: "Reset password", css: "/css/sign.css", token: req.params.token });
    }
  );
});


router.post("/reset/:token", function (req, res) {
  async.waterfall(
    [
      function (done) {
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
          },
          function (err, user) {
            if (!user) {
              req.flash(
                "error",
                "Password reset token is invalid or has expired."
              );
              return res.redirect("back");
            }
            if (req.body.password === req.body.confirm) {
              user.setPassword(req.body.password, function (err) {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function (err) {
                  req.logIn(user, function (err) {
                    done(err, user);
                  });
                });
              });
            } else {
              req.flash("error", "Passwords do not match.");
              return res.redirect("back");
            }
          }
        );
      },
      async function (user, done) {
        const msg = {
          from: "errandgenie233@gmail.com",
          to: user.email,
          subject: "errandGenie - Password Reset",
          text: `
            This is a confirmation that the password for your account  ${user.email} has just been changed.
          `,
          html: `
            <h1>Hello</h1>
            <p>.This is a confirmation that the password for your account  ${user.email} has just been changed.</p>
            
          `,
        };
        try {
          await sgMail.send(msg);
          req.flash("success", "Success! Your password has been changed.");
          done();
        } catch (error) {
          console.log(error);
          req.flash(
            "error",
            "We're terribly sorry, something went wrong. Please contact our support team."
          );
          res.redirect("/login");
        }
      },
    ],
    function (err) {
      res.redirect("/login");
    }
  );
});

http: module.exports = router;