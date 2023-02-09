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

function checkEmailInDB(email) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      function (err, result) {
        if (err || result.length === 0) {
          return reject(err);
        }
        return resolve(result[0].email);
      }
    );
  });
}
function insertNewUser(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, function (err, result) {
      if (err) {
        return reject(err);
      }
      return resolve(200);
    });
  });
}
// return new Promise((resolve, rejects) => {
//   connection.query(sqlQuery, function (err, result) {
//     if (err || result.length == 0) return rejects(err);
//     return resolve(result[0].password);
//   });
// });

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

  //form data
  // var name = req.body.username;
  // var password = req.body.password;
  // var email = req.body.email;

  const { username, password, email } = req.body;

  // bcrypt.genSalt(10, (err, salt) => {
  //   bcrypt.hash(password, salt, function (err, hash) {
  //     if (err) throw err;
  //     password = hash;
  //   });
  // });

  const saltRounds = 10;
  var hash = bcrypt.hashSync(req.body.password, saltRounds);

  var sql = `INSERT INTO users (username, password, email) VALUES ("${username}", "${hash}", "${email}")`;

  // connection.query(sql, function (err, result) {
  // if (err.code === "ER_DUP_ENTRY") {
  //   throw new Error("Ez az email cím már foglalt");
  //   res.statusCode = 409;
  // } else if (err) throw err;
  // else {
  const emailInDb = await checkEmailInDB(email).catch((error) => {
    console.log("code changed");
    res.statusCode = 100;
  });

  if (res.statusCode != 100) {
    res.statusCode = 409;
    console.log("conflict");
  } else {
    res.statusCode = await insertNewUser(sql);
  }
  //}
});
// });
//TODO send emails to validate registration
//TODO ports are acting up
//TODO SQL injection????
