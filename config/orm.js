
// Import MySQL connection.
var connection = require("./connection");

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

function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

function updatecart(object){

    var column1 = object.columns[0]
    var value1raw = object.values[0].split("\"").join("")
    var value1r = value1raw.split("[").join("")
    var value1 = value1r.split("]").join("")
    var column2 = object.columns[1]
    var value2raw = object.values[1].split("\"").join("")
    var value2r = value2raw.split("[").join("")
    var value2 = value2r.split("]").join("")
     var string = column1 + "=\"" + value1 + "\", " + column2 + "=\"" + value2 + "\""


    return string
}

//   OBJECT FOR ALL OUR SQL STATEMENT FUNCTIONS
var orm = {
  // show all testimonials through MYSQL statement
  all: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw (err);
      }
      cb(result);
    });
  },
  sort: function (tableInput, column, cb) {
    var queryString = "SELECT * FROM " + tableInput + " order by " + column + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw (err);
      }
      cb(result);
    });
  },
  
  pull: function(tableInput, prodID, cb) {
    var queryString = "SELECT * FROM " + tableInput + " where id = " + prodID + ";";
    connection.query(queryString, function(err, result) {
      if(err) {
        
        throw (err);
      }
      cb (result);
    });
  },
  show: function(tableInput, userID, cb) {

    var queryString = "SELECT * FROM " + tableInput + " where userid = " + userID + ";";
    connection.query(queryString, function(err, result) {
      if(err) {
        
        throw (err);
      }
      cb (result);
    });
  },
  check: function(tableInput, userID, cb) {

    var queryString = "SELECT * FROM " + tableInput + " where userid = " + userID + ";";
    connection.query(queryString, function(err, result) {
      // if(err) {
        
      //   throw (err);
      // }
      cb (result);
    });
  },
  createprod: function (table, cols, vals, cb) {

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

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  newcarts: function (table, cols, vals, cb) {

    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    
    // prints out ["?","?","?"] 
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  updatecarts: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += updatecart(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  update: function (table, col, val, id, cb) {
    var queryString = "UPDATE " + table + " SET " + col + "=" + JSON.stringify(val);
    queryString += " WHERE ";
    queryString += id;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  delete: function (table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);

    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  // selectWheresort: function (tableInput, colToSearch, valOfCol, sort, cb) {
  //   var queryString = "SELECT * FROM " + tableInput + " WHERE " + colToSearch + " = " + JSON.stringify(valOfCol) + " order by "+ JSON.stringify(sort);
  //   console.log(queryString)
  //   connection.query(queryString, function (err, result) {
  //     if (err) throw err;
  //     cb(result)
  //   });
  // },

  // passport addition selectWhere and Create
  selectWhere: function (tableInput, colToSearch, valOfCol, cb) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    connection.query(queryString, [tableInput, colToSearch, valOfCol], function (err, result) {
      if (err) throw err;
      cb(err, result)
    });
  },
  create: function (tableInput, cols_vals, cb) {
    var queryString = "INSERT INTO ?? set ?";
    connection.query(queryString, [tableInput, cols_vals], function (err, result) {
      if (err) throw err;
      cb(err, result)
    });

  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;