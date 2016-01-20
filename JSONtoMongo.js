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

var JSONListings = require('./listings.json');

for(var entry in JSONListings.entries)
 {
    var val = JSONListings.entries[entry];

    var lat = '0';
    var long = '0';

    var addr = 'none';

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

    toInsert.save(function(err){
      if(err){
        console.log(err);
      }
      console.log('saved!');
    });

 }



/*
  Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */
