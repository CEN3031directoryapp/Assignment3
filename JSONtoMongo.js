'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config'),
    listingSchema = mongoose.model('Listing').schema;

/* Connect to your database */
// var db = 'mongodb://localhost/listings';
var db = config.db.uri;
console.log(db);


mongoose.connect(db, function(err){
  if (err){
    console.log('ERROR: Unable to connect to ' + db + ". " + err);
  } else{
    console.log('SUCCESS: Connected to ' + db);
  }
});

/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
 */

var Element = mongoose.model('Elements', listingSchema);

var testListing = new Element({
  code: 'AAA',
  name: 'AtestAtestA'
});

// console.log(testListing);

var JSONListings = require('./listings.json');

// console.log(JSONListings)

for(var entry in JSONListings.entries)
 {
    var val = JSONListings.entries[entry];

    var lat = "undefined";
    var long = "undefined";

    var addr = "undefined";

    if(!(val.coordinates === null || val.coordinates === undefined))
    {
      lat = val.coordinates.latitude;
      long = val.coordinates.longitude;
    }

    if(!(val.address === null || val.address === undefined))
    {
      addr = val.address;
    }

    var toInsert= new Element({
      code: val.code,
      name: val.name,
      coordinates:{
        latitude: lat,
        longitude: long
      },

      address: addr
    });

    toInsert.save(function(err, toInsert){
      if(err){

      }
    });
    console.log(toInsert);

 }



/*
  Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */
