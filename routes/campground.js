var express = require("express"),
  router = express.Router({ mergeParams: true }),
  Campground = require("../models/campground");

var authMidleware = require("../middleware");

//Index Route
router.get("/", function (req, res) {
  // getting all Campground from Database
  Campground.find({}, function (err, allcampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("campground/index", { campground: allcampground });
    }
  });
});

// CREATE  Route
router.post("/", authMidleware.isLoggedIn, function (req, res) {
  // this post method will take data from FORM and routerly functionality here
  var name = req.body.name; // body is used to take data
  var price = req.body.price;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user.id,
    username: req.user.username,
  };
  var newcampground = {
    name: name,
    price: price,
    image: image,
    description: description,
    author: author,
  };

  Campground.create(newcampground, function (err, newCreated) {
    if (err) {
      
      console.log(err);
    } else {
      // and this will redirect to "/campground" that is of get
      req.flash("success", "Campground Add");
      res.redirect("/campground");
    }
  });
});

// NEW  Route
router.get("/new", authMidleware.isLoggedIn, function (req, res) {
  res.render("campground/new"); //this will show FORM
});

//ShOW Route
router.get("/:id", function (req, res) {
  //finding campground by thier id
  //findById(id, callback)
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        res.render("campground/show", { campground: foundCampground });
      }
    });
});

//Edit Route
router.get("/:id/edit", authMidleware.checkOwnerShip, function (req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (
    err,
    updateCampground
  ) {
    res.render("campground/edit", { campground: updateCampground });
  });
});

//Update Route
router.post("/:id", authMidleware.checkOwnerShip, function (req, res) {
  // this campground refer to campground[name],campground[image] in edit.ejs
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (
    err,
    updateCampground
  ) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campground/" + req.params.id);
    }
  });
});

//Destroy Route
router.delete("/:id", authMidleware.checkOwnerShip, function (req, res) {
  Campground.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campground");
    }
  });
});

// Export file
module.exports = router;
