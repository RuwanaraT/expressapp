var mysql = require('mysql')

var db;

var settings = {
  host: "localhost",
  user: "root",
  password: "",
  database: "hbsproject"
};

function connectDatabase() {

    if(!db) {

        db = mysql.createConnection(settings);

        db.connect(function(err) {

            if(!err) {

                console.log("Database Connected ! ");
            }

            else {
                console.log("Database NOT Connected ! ");
            }
        })


        }

        return db;
}

module.exports = connectDatabase();