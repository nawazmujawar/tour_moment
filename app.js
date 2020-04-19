var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  flash =  require("connect-flash"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  methodOveride = require("method-override"),
  middleware = require("./middleware"),
  seedDB = require("./seeds");

var campgroundRoute = require("./routes/campground"),
    commentRoute    = require("./routes/comment"),
    indexRoute      = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/img"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOveride("_method"));
app.use(flash());
//seedDB();//when server starts it run this seeds file first

//PASSPORT Config.
app.use(require("express-session")({
    secret : "hello world",
    resave : false,
    saveUninitialized :false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// This will use all route
// "/value" this will replace url  this will tell they start with that route 
app.use("/",indexRoute);
app.use("/campground",campgroundRoute);
app.use("/campground/:id/comments",commentRoute);




app.listen(3000, function () {
  console.log("Server has been started.........");
});

