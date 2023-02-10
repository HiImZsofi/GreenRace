//imports
const express = require("express");
var mysql = require("mysql2");
var http = require("http");
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Connect to database
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "greenRace",
  port: "3306",
});

//check if mysql server is ok
connection.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

//server port
const PORT = process.env.PORT || 3001;

const app = express();
const cors = require("cors");
const { error } = require("console");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//checks if email already exists in database
function checkEmailInDB(email) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      function (err, result) {
        if (err || result.length === 0) {
          return reject(err); //if not then the query automatically moves on
        }
        return resolve(result[0].email); //if it exists then return the same email
      }
    );
  });
}

//own promise for sql query so async will not mess it up
function insertNewUser(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, function (err, result) {
      if (err) {
        return reject(err);
      }
      return resolve(200); //status code is 200 if insert was successful
    });
  });
}

//test page route
app.get("/", (req, res) => {
  res.send("Main page");
});

//start server on given port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//register page route
app.post("/register", jsonParser, async (req, res, next) => {
  //request headers
  res.set({
    "Content-Type": "application/json",
  });

  //request data
  const { username, password, email } = req.body;

  const saltRounds = 10; //higher number harder it is to reverse
  var hash = bcrypt.hashSync(password, saltRounds); //hash the given password with salt before inserting

  var sql = `INSERT INTO users (username, password, email) VALUES ("${username}", "${hash}", "${email}")`;

  try {
    await checkEmailInDB(email);
  } catch (error) {
    res.statusCode = 100;
    console.log("code changed to", res.statusCode);
  }

  if (res.statusCode == 100) {
    try {
      await insertNewUser(sql);
      res.statusCode = 200;
      console.log("Inserted user", res.statusCode);
    } catch (error) {
      res.statusCode = 500;
      res.sendStatus(error);
      console.log("Server error", res.statusCode);
    }
  }
});
//TODO send emails to validate registration
//TODO ports are acting up
//TODO SQL injection????
