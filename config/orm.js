// Import MySQL connection.
var connection = require("../config/connection.js");

// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks 
// - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

//   OBJECT FOR ALL OUR SQL STATEMENT FUNCTIONS
var orm = {
    // show all testimonials through MYSQL statement
    all: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw (err);
            }
            cb (result);
        });
    },

    create: function(table, cols, vals, cb) {
      
      var queryString = "INSERT INTO " + table;

      queryString += " (";
      // prints out (review, author, city)
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      // prints out ["?","?","?"] 
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
      
      console.log(queryString);

      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }

        cb(result);
      });
    },

    delete: function(table, condition, cb) {
      var queryString = "DELETE FROM " + table;
      queryString += " WHERE ";
      queryString += condition;

      console.log(queryString);

      connection.query(queryString, function(err, result) {
        if(err) {
          throw err;
        }

        cb(result);
      });
    }
}

// Export the orm object for the model (cat.js).
module.exports = orm;