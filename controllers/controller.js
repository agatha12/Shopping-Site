var express = require("express");

var router = express.Router();

// Import model (TBA)
var myModel = require("../models/models.js");

// =====================================
// HOME PAGE 
// =====================================

router.get("/", function (req, res) {
  res.render("index");
});

// =====================================
// TESTIMONIAL PAGE
// =====================================

//Reads all Testimonials
router.get("/testimonials", function (req, res) {
  myModel.all(function (data) {


    var myObject = {
      testimonials: data
    };

    // console.log(myObject);
    res.render("testimonials", myObject);
  });
});

// Posts new testimonial
router.post("/api/testimonials", function (req, res) {
  myModel.create([
    "review", "author", "city"
  ], [
      req.body.review, req.body.author, req.body.city
    ], function (result) {
      res.json({ id: result.insertId });
    });
});

// =====================================
// CARTS PAGE 
// =====================================

var carts = require("../models/carts");

// Post request to update the cart table in DB
router.post("/api/carts", function (req, res) {
  carts.newcarts([
    "userid", "products", "quantity"
  ], [
      req.body.userid, req.body.products, req.body.quantity
    ], function (result) {
      res.json({ id: result.insertId });
    });
});

router.put("/api/cartsupdate/:user", function (req, res) {
  var userid = req.params.user
  carts.updatecarts({
    columns: ["products", "quantity"], 
    values: [req.body.products, req.body.quantity]
  },"userid = "+userid, function (result) {
      res.json({ id: result.insertId });
    });
});

// Get request to populate carts.handlebars with user's shopping cart info
router.get("/api/carts/:userid", function (req, res) {

  // Makes userid into a string for MySQL statement to work
  var userID = JSON.stringify(req.params.userid);
  // console.log(userID);
  carts.show(userID, function (data) {
    var userObj = {
      carts: data
    };
    

    // console.log(userObj); 
    // console.log("CART CONTENT" + "\n" 
    // + "=========================" + "\n"
    // + "username: " + userObj.carts[0].userid +"\n"
    // + "Product: " + userObj.carts[0].products + "\n" +
    // "Quantity: " + userObj.carts[0].quantity + "\n" );

    res.render("carts", userObj);
    // res.json({carts : data});
  });
});
router.get("/api/cartcheck/:userid", function (req, res) {

  // Makes userid into a string for MySQL statement to work
  var userID = JSON.stringify(req.params.userid);
  // console.log(userID);
  carts.check(userID, function (data) {
  //   if (){
  //     var userObj = {
  //       carts: "no cart"
  //     };
  //   }
  //   else{
  //   var userObj = {
  //     carts: data
  //   };
  // }
console.log(data)
    res.json(data)
    // res.json({carts : data});
  });
});
// =====================================
// PRODUCT VIEW PAGE 
// =====================================

var product = require("../models/products");

// Displays Product View
router.get("/productview", function (req, res) {
  product.all(function (data) {
    var prodObject = {
      product: data
    };
    // console.log(prodObject);
    res.render("products", prodObject);
  });
});

router.get("/productview/:col", function (req, res) {
  var column = req.params.col
  // console.log(column)
  product.sort(column, function (data) {
    var prodObject = {
      product: data
    };
    // console.log(prodObject);
    res.render("products", prodObject);
  });
});

router.get("/productview/select/:condition", function (req, res) {
  var condition = req.params.condition
  console.log(condition)
  product.selectWhere("category", condition, function (data) {
    var prodObject = {
      product: data
    };
    // console.log(prodObject);
    res.render("products", prodObject);
  });
});

// router.get("/productview/select/:condition/:sort", function (req, res) {
//   var condition = req.params.condition
//   var sort = req.params.sort
//   // console.log(column)
//   product.selectWheresort("category", condition, sort, function (data) {
//     var prodObject = {
//       product: data
//     };
//     console.log(prodObject);
//     res.render("products", prodObject);
//   });
// });

// Connects database to Product Modal
router.get("/api/productview/:id", function (req, res) {

  var prodID = req.params.id;
  console.log("Your prod Id is: " + prodID);
  product.pull(prodID, function (data) {
    var prodObj = {
      product: data
    };

    var prodName = prodObj.product[0].name;
    var prodPrice = prodObj.product[0].price;
    var prodDesigner = prodObj.product[0].designer;
    console.log(prodName + "/ " + prodPrice + "/ " + prodDesigner);
    // console.log(prodObj);

    // connects as a json obj in the front-end project2.js
    res.json({ product: data });
  })
});

// =====================================
// SUPERVISOR VIEW PAGE 
// =====================================

// Connects to the Supervisor View 
router.get("/supervisorview", function (req, res) {
  product.all(function (data) {
    var prodObject = {
      product: data
    };
    // console.log(prodObject);
    res.render("supervisor", prodObject);
  });
});

// Supervisor deletes a product 
router.delete("/api/supervisor/:id", function (req, res) {
  var condition = "id=" + req.params.id;

  product.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Supervisor can update the products
router.put("/api/supervisor/:id", function (req, res) {
  var id = "id = " + req.params.id;
  var col = req.body.col
  var val = req.body.val
  console.log(col, val, id)

  product.update(col, val, id, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.get("/addprod", function (req, res) {

  res.render("supervisoradd");

});

// Supervisor can add a new product
router.post("/api/supervisor/add", function (req, res) {
  product.createprod([
    "id", "name", "price", "img", "designer", "category", "quantity"
  ], [
      req.body.id, req.body.name, req.body.price, req.body.img, req.body.designer, req.body.category, req.body.quantity
    ], function (result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
});

// =====================================
// SUPERVISOR VIEW TESTIMONIAL PAGE
// =====================================

// Supervisor can manipulate the testimonials from the user
router.get("/supervisortestimonialview", function (req, res) {
  myModel.all(function (data) {

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

// Supervisor can delete user testimonials
router.delete("/api/suptesti/:condition", function (req, res) {
  var condition = "id = " + req.params.condition;
  console.log(condition)
  myModel.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// =====================================
// SUPERVISOR VIEW ORDERS PAGE 
// =====================================

// gets all information for customer orders
router.get("/supervisorordersview", function (req, res) {
  carts.all(function (data) {

    var myOrders = {
      orders: data
    };

    console.log(myOrders);
    res.render("supervisororders", myOrders);
  });
});

// deletes customer order in database
router.delete("/api/supervisorordersview/:condition", function (req, res) {

  var condition = "userid="+req.params.condition;
  console.log(condition);

  carts.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


//displays about us page

router.get("/aboutus", function (req, res) {
  product.all(function (data) {
    var prodObject = {
      product: data
    };
    // console.log(prodObject);
    res.render("aboutus", prodObject);
  });
});

// displays about the designers page

router.get("/aboutthem", function (req, res) {
  product.all(function (data) {
    var prodObject = {
      product: data
    };
    // console.log(prodObject);
    res.render("aboutthem", prodObject);
  });
});



// Export routes for server.js to use.
module.exports = router;
