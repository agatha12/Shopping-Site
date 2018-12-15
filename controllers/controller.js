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
    // console.log(prodObject);
    res.render("products", prodObject);
  });
});

router.get("/productview/:col", function(req, res) {
  var column = req.params.col
  console.log(column)
  product.sort(column, function(data) {
    var prodObject ={
        product: data
      };
    console.log(prodObject);
    res.render("products", prodObject);
  });
});


router.get("/supervisorview", function(req, res) {
    product.all(function(data) {
      var prodObject ={
          product: data
        };
      console.log(prodObject);
      res.render("supervisor", prodObject);
    });
  });


  router.delete("/api/supervisor/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    product.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  router.put("/api/supervisor/:id", function(req, res) {
    var id = "id = " + req.params.id;
    var col = req.body.col
    var val = req.body.val
    console.log(col, val, id)

  
   
    product.update(col, val, id, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  router.get("/addprod", function(req, res) {
    
      res.render("supervisoradd");
    
  });

  router.post("/api/supervisor/add", function(req, res) {
    product.create([
      "id", "name", "price", "img", "designer", "category"
    ], [
      req.body.id, req.body.name, req.body.price, req.body.img, req.body.designer, req.body.categort
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });

  router.get("/supervisortestimonialview", function(req, res) {
    myModel.all(function(data) {
        
        // object to hold data in schema.sql
        var myObject = {
            testimonials: data
        };
        // console logs database of testimonials
        // console.log(myObject);

        // renders testimonials.handlebars with object holding database 
        res.render("supervisortestimonials", myObject);
    }); 
});

router.delete("/api/suptesti/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log(condition)
  myModel.delete( condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
