var mongoose = require("mongoose");
//SCHEMA Setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  author: {
    id: {   
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      //comment array
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // refers to Comment model
    },
  ],
});

//Creating model and Exporting

module.exports = mongoose.model("Campground", campgroundSchema);
