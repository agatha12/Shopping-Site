

var orm = require("../config/orm.js");

var product = {
  all: function(cb) {
    orm.all("products", function(res) {
      cb(res);
    });
  },
};

module.exports = product;






