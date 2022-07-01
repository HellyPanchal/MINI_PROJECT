var con = require('./connection');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

app.get('/',function(req, res){
    res.sendFile(__dirname+'/book_table.html');
});

app.post('/',function(req, res){
    var Name = req.body.Name;
    var Email = req.body.Email;
    var Phone_No = req.body.Phone_No;
    var No_of_guests = req.body.No_of_guests;
    var Date = req.body.Date;
    var Time = req.body.Time;
    var Message = req.body.Message;

    con.connect(function(error){
        if(error) throw error;

        var sql = "INSERT INTO book_table(Name,Email,Phone_No,No_of_guests,Date,Time,Message) VALUES ?";
        
        var values = [
            [Name, Email, Phone_No, No_of_guests, Date, Time, Message]
        ];

        con.query(sql,[values],function(error, result){
            if(error) throw error;
            res.send('Successfull..!!! '+result.insertId);
        });

    });
});

app.listen(7000);