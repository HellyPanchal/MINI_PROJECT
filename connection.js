const { appendFile } = require("fs");
var mysql = require("mysql");

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mini_project"
});

module.exports = con;