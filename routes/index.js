var express = require("express"),
    router = express.Router({mergeParams: true}),
    passport = require("passport"),
    User = require("../models/user");

//Index Route
router.get("/", function (req, res) {
  res.redirect("/campground");
});

//sign up form display
router.get("/register", function (req, res) {
  res.render("register");
});
// sign up logic
router.post("/register", function (req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Registered Successfully...");
      res.redirect("/campground");
    });
  });
});

//login form display
router.get("/login", function (req, res) {
  res.render("login");
});
//login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campground",
    failureRedirect: "/register",
  }),
  function (req, res) {}
);
//logout route
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success","logout successfully...");
  res.redirect("/campground");
});

//Export file
module.exports = router;