//imports
const express = require("express");
const mysql = require("mysql2");
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//server port
const PORT = process.env.PORT || 3001;

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

//Query password from the users table in the database
function getPassQuery(email) {
  return new Promise((resolve, rejects) => {
    connection.query(
      "SELECT password FROM users WHERE email = ?",
      [email],
      function (err, result) {
        if (err || result.length == 0) return rejects(err);
        return resolve(result[0].password);
      }
    );
  });
}

//start server on given port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//test page route
app.get("/", (req, res) => {
  res.send("Main page");
});

//register page route
app.post("/register", async (req, res) => {
  //request headers
  res.set({
    "Content-Type": "application/json",
  });

  //request data
  const { username, password, email } = req.body;

  const saltRounds = 10; //higher number harder it is to reverse
  var hash = bcrypt.hashSync(password, saltRounds); //hash the given password with salt before inserting

  var sql = `INSERT INTO users (username, password, email, points) VALUES ("${username}", "${hash}", "${email}",0)`; //TODO SQL injection????

  try {
    await checkEmailInDB(email);
    res.statusCode = 500;
  } catch (error) {
    res.statusCode = 100;
    console.log("code changed to", res.statusCode);
  }
  try {
    await insertNewUser(sql);
    res.statusCode = 200;
    console.log("Inserted user", res.statusCode);
    res.send(JSON.stringify({ result: "Successful registration" }));
  } catch (error) {
    res.statusCode = 500;
    console.log("Server error", res.statusCode);
    res.json(JSON.stringify({ error: "Duplicate email" }));
  }
});

app.post("/login", async (req, res) => {
  //Store data in from the POST request
  const { email, password } = req.body;

  let secretKey = require("crypto").randomBytes(256).toString("base64");
  let data = {
    time: Date.now(),
    email: req.body.email,
  };

  //Store data from SELECT query
  const passwordInDB = await getPassQuery(email).catch((error) => {
    res.statusCode = 404;
    console.log(404);
    res.send(JSON.stringify({ error: "Invalid email", response: error }));
  });

  //   const token = jwt.sign(
  //     data,
  //     secretKey,
  //     { expiresIn: "1h" },
  //     {
  //       algorithm: "HS256",
  //       expiresIn: "1h",
  //     }
  //   );

  let token;

  //Check password againts the one fetched from the database
  if (res.statusCode != 404) {
    bcrypt.compare(password, passwordInDB).then((compareRes, compareErr) => {
      if (compareErr) throw compareErr;
      if (compareRes) {
        try {
          token = jwt.sign({ email: this.email }, secretKey, {
            expiresIn: "1h",
          });
        } catch (e) {
          throw new Error(e.message);
        }
        res.cookie("auth-token", token);
        res.send("ok");
        console.log("200 OK");
        console.log(res.cookie.toString());
      } else {
        res.statusCode = 401;
        res.send(JSON.stringify({ error: "Invalid password" }));
        console.log("401 Auth Err");
      }
    });
  }
});

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];

  //make sure if token header is not undefined
  if (typeof header !== undefined) {
    const bearer = header.split(" ");
    const token = bearer[1];

    req.token = token;
    next();
  } else {
    //if undefined return forbidden status code
    res.sendStatus(403);
  }
};

app.get("/userPage", checkToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authorizedData) => {
    if (err) {
      res.sendStatus(403);
      console.log("Caught you lacking");
    } else {
      res.json({
        message: "Successful login",
      });
      console.log("Successful login");
    }
  });
});

app.post("/settings", async (req, res) => {
  const { newUsername, newPassword, currentPassword } = req.body;
  if (newUsername !== null) {
    //TODO use id instead of email
    const passwordInDB = await getPassQuery(email).catch((error) => {
      res.statusCode = 404;
      console.log(404);
      res.send(JSON.stringify({ error: "Invalid email", response: error }));
    });
    bcrypt
      .compare(currentPassword, passwordInDB)
      .then((compareRes, compareErr) => {
        if (compareErr) throw compareErr;
        if (compareRes) {
          //TODO update sql with id
          res.statusCode = 200;
          res.send(JSON.stringify({ result: "Saved" }));
        } else {
          res.statusCode = 401;
          res.send(JSON.stringify({ error: "Invalid password" }));
          console.log("401 Auth Err");
        }
      });
  } else if (newPassword !== null) {
    const passwordInDB = await getPassQuery(email).catch((error) => {
      res.statusCode = 404;
      console.log(404);
      res.send(JSON.stringify({ error: "Invalid email", response: error }));
    });
    bcrypt
      .compare(currentPassword, passwordInDB)
      .then((compareRes, compareErr) => {
        if (compareErr) throw compareErr;
        if (compareRes) {
          //TODO update sql with id
          res.statusCode = 200;
          res.send(JSON.stringify({ result: "Saved" }));
        } else {
          res.statusCode = 401;
          res.send(JSON.stringify({ error: "Invalid password" }));
          console.log("401 Auth Err");
        }
      });
  } else {
    res.statusCode = 200;
    res.send(JSON.stringify({ result: "OK" }));
  }
});
//TODO SQL injection????
