/* Fill out these functions using Mongoose queries*/
var Listing = require('./ListingSchema.js');
var mongoose = require('mongoose');

//connect to server
var config = require('./config');
var db = config.db.uri;

mongoose.connect(db, function(err){
  if (err){
    console.log('ERROR: Unable to connect to ' + db + ". " + err);
  } else{
    console.log('SUCCESS: Connected to ' + db);
  }
});

//load the listing schema
var listingSchema = mongoose.model('Listing').schema;
var Listings = mongoose.model('Listing', listingSchema);

//http://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /*
    Find the document that contains data corresponding to Library West,
    then log it to the console.
   */

   var query = Listings.find();

   query.exec(function(err, result){
     if (err)
     {
       return handleError(err);
     }

     console.log(result);

   });
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console.
   */
};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then
    log the updated document to the console.
   */
};
var retrieveAllListings = function() {
  /*
    Retrieve all listings in the database, and log them to the console.
   */
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();
