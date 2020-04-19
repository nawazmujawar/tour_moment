var express = require("express"),
  router = express.Router({ mergeParams: true }),
  Campground = require("../models/campground"),
  Comment = require("../models/comment");
var authMidleware = require("../middleware");
//NEW route
router.get("/new", authMidleware.isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

//CREATE route
router.post("/", authMidleware.isLoggedIn, function (req, res) {
  //finding campground by ID
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      // req.body.comment is used bcz in new.ejs name are taken in comment[content],
      //    comment[author] manner
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          //add author to comment
          comment.author.id = req.user.id;
          comment.author.username = req.user.username;
          req.flash("success", "Comment added...");
          //save comment
          comment.save();
          //pushing new comment in comments array in available campground

          campground.comments.push(comment);
          campground.save();
          res.redirect("/campground/" + req.params.id); // redirecting to show route
        }
      });
    }
  });
});

// /campground/:id/comments/:comment_id/edit
//Edit Route
router.get("/:comment_id/edit", authMidleware.checkCommentOwnerShip, function (req, res) {
  Comment.findById(req.params.comment_id, function (err, foundComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        campground_id: req.params.id,
        comment: foundComment,
      });
    }
  });
});
//UPdate Route
router.post("/:comment_id", authMidleware.checkCommentOwnerShip, function (req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err,updateComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campground/" + req.params.id);
    }
  });
});

// /campground/:id/comment/:comment_id
// Destroy Route
router.delete("/:comment_id", authMidleware.checkCommentOwnerShip, function (req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function (err) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campground/" + req.params.id);
    }
  });
});

//Export file
module.exports = router;
