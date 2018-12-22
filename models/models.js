// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var myModel = {
    all: function(cb) {
        orm.all("testimonials", function(res) {
            cb(res);
        });
    },
    // Variables cols and vals are arrays 
    create: function(cols, vals, cb) {
        orm.createprod("testimonials", cols, vals, function(res) {
            cb(res);
        });
    },
    delete: function(condition, cb) {
        orm.delete("testimonials", condition, function(res) {
          cb(res);
        });
    }
};

// Export the database functions for the controller.js.
module.exports = myModel;

