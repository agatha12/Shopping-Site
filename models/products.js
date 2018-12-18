

var orm = require("../config/orm.js");

var product = {
  
  all: function(cb) {
    orm.all("products", function(res) {
      cb(res);
    });
  },
  sort: function(column, cb) {
    orm.sort("products", column, function(res) {
      cb(res);
    });
  },
  pull: function(prodID, cb) {
    orm.pull("products", prodID, function(res) {
      cb(res)
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("products", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(col, val, id, cb) {
    orm.update("products", col, val, id, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("products", condition, function(res) {
      cb(res);
    });
  }
};

module.exports = product;






