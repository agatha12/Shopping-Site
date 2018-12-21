// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var carts = {
    newcarts: function(cols, vals, cb) {
        orm.newcarts("orders", cols, vals, function(res) {
            cb(res);
        });
    },
    updatecarts: function(cols, vals, condition, cb) {
        orm.updatecarts("orders", cols, vals, condition, function(res) {
            cb(res);
        });
    },
    all: function(cb) {
        orm.all("orders", function(res) {
            cb(res);
        });
    },
    show: function (userID, cb) {
        orm.show("orders", userID, function(res) {
            cb(res);
        });
    },
    check: function (userID, cb) {
        orm.show("orders", userID, function(res) {
            cb(res);
        });
    },
    // Not working
    delete: function(condition, cb) {
        orm.delete("orders", condition, function(res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller.js.
module.exports = carts;

