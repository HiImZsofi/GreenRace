//imports
const express = require('express');
var mysql = require('mysql2');
var http = require('http');
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Connect to database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'greenRace',
  port: '3306'
});

//check if mysql server is ok
connection.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});


//server port
const PORT = process.env.PORT || 3001;


const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))


//test page route
app.get("/", (req, res) => {
  res.send("Main page");
});


//start server on given port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


//register page route
app.post('/register', jsonParser, (req, res, next) => {

  //request headers
  res.set({
    'Content-Type': 'application/json'
  }) 
  
  //form data
  var name = req.body.username; 
  var password = req.body.password;
  var email = req.body.email;

  
  //sql query
  var sql = `INSERT INTO users (username, password, email) VALUES ("${name}", "${password}", "${email}")`; //TODO user id
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    res.redirect('http://localhost:3001/');  //redirect to the main page if insert was successful
  });
});

//TODO ports are acting up 
