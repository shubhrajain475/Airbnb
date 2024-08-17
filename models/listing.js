const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
   filename:{
    type:String,
    required:true
   },
   url:{
    type:String,
    required:true,
   }
    
  },
  price: Number,
  location: String,
  country: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }],
  // Add owner as an ObjectId reference to a User model
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;