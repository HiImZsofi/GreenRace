//imports
const express = require('express');
var mysql = require('mysql2');
var http = require('http');
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var headers = { 
  'Content-Type' : 'application/json' 
};

//Connect to database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'greenRace',
  port: '3306'
});

//connect to database
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


app.get("/", (req, res) => {
  res.send("Main page");
});


//start server on given port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.post('/register', jsonParser, (req, res, next) => {
  // let data = {
  //   name: req.body.name,
  //   passwords: req.body.password,
  //   email: req.body.email
  // };
  res.set({
    'Content-Type': 'application/json'
  }) 
  
  var name = req.body.username; //TODO username buggy
  var password = req.body.password;
  var email = req.body.email;


  // let sql = "INSERT INTO Users SET ?";
  // let query = connection.query(sql, data,(err, results) => {
  //   if(err) throw err;
  //   res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  //   res.redirect('/');
  // });

  var sql = `INSERT INTO users (username, password, email) VALUES ("${name}", "${password}", "${email}")`; //TODO user id
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    res.redirect('http://localhost:3001/');
  });
});

//TODO ports are acting up 
