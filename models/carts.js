// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var carts = {
    newcarts: function(cols, vals, cb) {
        orm.newcarts("orders", cols, vals, function(res) {
            cb(res);
        });
    },

    all: function(cb) {
        orm.all("orders", function(res) {
            cb(res);
        });
    },
    delete: function(condition, cb) {
        orm.delete("orders", condition, function(res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller.js.
module.exports = carts;

