var mysql = require('mysql');

var con = mysql.createConnection({
    host: "192.168.91.128",
    user: "root",
    password: "123456",
    database: "test"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con

