//this file created to check working ...

var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "ROse",
    image:
      "https://images.unsplash.com/photo-1586208224642-7a797076dcb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "A campsite or camping pitch is a place used for overnight stay in an outdoor area. In UK English, a campsite is an area, usually divided into a number of pitches, where people can camp overnight using tents or camper vans or caravans; this UK English use of the word is synonymous with the US English expression campground. In American English, the term campsite generally means an area where an individual, family, group, or military unit can pitch a tent or park a camper; a campground may contain many campsites.",
  },
  {
    name: "Biscuit",
    image:
      "https://images.unsplash.com/photo-1586244897821-c06ba29d5b5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "A campsite or camping pitch is a place used for overnight stay in an outdoor area. In UK English, a campsite is an area, usually divided into a number of pitches, where people can camp overnight using tents or camper vans or caravans; this UK English use of the word is synonymous with the US English expression campground. In American English, the term campsite generally means an area where an individual, family, group, or military unit can pitch a tent or park a camper; a campground may contain many campsites.",
  },
  {
    name: "Chocolate",
    image:
      "https://images.unsplash.com/photo-1586195831043-72f28861359d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "A campsite or camping pitch is a place used for overnight stay in an outdoor area. In UK English, a campsite is an area, usually divided into a number of pitches, where people can camp overnight using tents or camper vans or caravans; this UK English use of the word is synonymous with the US English expression campground. In American English, the term campsite generally means an area where an individual, family, group, or military unit can pitch a tent or park a camper; a campground may contain many campsites.",
  },
];
// need to export it so move below code in function
function seedDB() {
  // Remove all Campground
  Campground.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("Campground Removed...!");
    //add few Campgrounds
    data.forEach(data => {
        Campground.create(data, function (err, campground) {
            if(err){
                console.log(err);
            }
            else{
                console.log("campground added ....");
                Comment.create({
                 content : "Stay safe",
                 author : "Albert"   
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    }
                    else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("comment added...");
                    }
                })
            }
        });    
    });
    
    //add few Comments
  });
}
//export the file

module.exports = seedDB;
