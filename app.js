//=================================//
const con = require("./connection");
//===========================================//

const express = require('express');
const port = process.env.PORT || 3000;  //this is our port no.

const app = express();         // this is our app or instance of express


//====================================//

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

//========================================//


//API middlewares
app.use(express.json());     //for accepting data to json format

app.use(express.urlencoded());  //to decode data send through html form

app.use(express.static('public'));

const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');


//API routes
app.get('/form', (req,res)=>{

    res.sendFile(__dirname + '/public/index.html');

});

app.post('/formPost', (req,res)=>{
    //console.log(req.body);

    //================================//
    var Name = req.body.Name;
    var Email = req.body.Email;
    var Phone_No = req.body.Phone_No;
    var No_of_guests = req.body.No_of_guests;
    var Date = req.body.Date;
    var Time = req.body.Time;
    var Message = req.body.Message;

    con.connect(function(error){
        if(error) throw error;

        var sql = "INSERT INTO book_table(Name,Email,Phone_No,No_of_guests,Date,Time,Message) VALUES('"+Name+"','"+Email+"','"+Phone_No+"','"+No_of_guests+"','"+Date+"','"+Time+"','"+Message+"')";
        con.query(sql, function(error, result){
            if(error) throw error;
            // res.send('registered successfully'+result.insertId);
            res.redirect('/table_book_data')
        });
    });
});

app.post('/reviewPost', (req,res)=>{
    //console.log(req.body);

    //================================//
    var Name = req.body.Name;
    var Email = req.body.Email;
    var star = req.body.star;
    var feedback_msg = req.body.feedback_msg;

    con.connect(function(error){
        if(error) throw error;

        var sql = "INSERT INTO feedback(Name,Email,star,feedback_msg) VALUES('"+Name+"','"+Email+"','"+star+"','"+feedback_msg+"')";
        con.query(sql, function(error, result){
            if(error) throw error;
            // res.send('registered successfully '+result.insertId);
            res.redirect('/fedback')
        });
    });
});

//show book table data
app.get('/table_book_data' , (req, res) => {

    let sql = 'SELECT * FROM book_table';
        con.query(sql, function(error, result){
            if(error) throw error;
            res.render('table_book_data', {title: 'table_book_data', table_book_data: result})
        });
})

//show fedback
app.get('/fedback' , (req, res) => {

    let sql = 'SELECT * FROM feedback';
        con.query(sql, function(error, result){
            if(error) throw error;
            res.render('fedback', {title: 'fedback', fedback: result})
        });
})


// this is basically to listen on port no
app.listen(port, ()=>{
    console.log(`sever started at http://localhost:${port}`)
});