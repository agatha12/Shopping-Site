var express = require("express");

var router = express.Router();

// Import model (TBA)
var myModel = require("../models/models.js");

//Routes
    
//Read all reviews
router.get("/testimonials", function(req, res) {
    myModel.all(function(data) {
        
        // object to hold data in schema.sql
        var myObject = {
            testimonials: data
        };
        // console logs database of testimonials
        console.log(myObject);

        // renders testimonials.handlebars with object holding database 
        res.render("testimonials", myObject);
    }); 
});

router.post("/api/testimonials", function(req, res) {
    myModel.create([
        "review", "author", "city"
    ], [
        req.body.review, req.body.author, req.body.city
    ], function(result) {
        res.json({ id: result.insertId});
    });
});


var product = require("../models/products");


router.get("/productview", function(req, res) {
  product.all(function(data) {
    var prodObject ={
        product: data
      };
    console.log(prodObject);
    res.render("products", prodObject);
  });
});


// Export routes for server.js to use.
module.exports = router;