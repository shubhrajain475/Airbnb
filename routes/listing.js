const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../Schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const {storage}=require('../cloudConfig.js');
const multer=require('multer');
const upload=multer({storage});


// router
//   .route("/")
//   .get(wrapAsync(listingController.index))
//   .post(
//     isLoggedIn,
//     validateListing,
//     wrapAsync(listingController.createListing)
//   );

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Index Route
router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route
router.get("/:id", wrapAsync(listingController.showListing));

//Create Route
router.post(
"/",
isLoggedIn,
upload.single("listing[image]"),
validateListing,
wrapAsync(listingController.createListing)
);
// router.post("/",upload.single('listing[image]'),(req,res)=>{
//   res.send(req.file);
// });

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(listingController.renderEditForm)
);

//Update Route
router.put(
  "/:id",
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
);

//Delete Route
router.delete("/:id", isLoggedIn, wrapAsync(listingController.destroyListing));
module.exports = router;
