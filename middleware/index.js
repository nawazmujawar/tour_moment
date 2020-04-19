var Campground = require("../models/campground");
var Comment = require("../models/comment");

//All Middlewares are here..

// middleware to check ownership
exports.checkOwnerShip = function (req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function (err, foundCampground) {
      if (err) {
        res.redirect("back");
      } else {
        if (foundCampground.author.id.equals(req.user.id)) {
          next();
        } else {
          req.flash("error", "You don't have Permissions !");
          res.redirect("back");
        }
      }
    });
  }
  else{
    req.flash("error", "You are not Login...!");
    res.redirect("back");
  }

};

// middleware to check ownership
exports.checkCommentOwnerShip = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err) {
        res.redirect("back");
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have Permissions!");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You are not Login...!");
    res.redirect("back");
  }
};

//middleware
exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You are not Login...!");
  res.redirect("/login");
};
