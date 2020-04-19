var mongoose = require("mongoose");

//COmment Schema

var commentSchemca = mongoose.Schema({
    content  : String,
    author : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "User"
        }, username : String
    }
});

//creating and exporting model

module.exports =  mongoose.model("Comment", commentSchemca);