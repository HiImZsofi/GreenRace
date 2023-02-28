//imports
import {
	changePassword,
	changeUsername,
	checkEmailInDB,
	getIDFromDB,
	getUserDataFromDB,
	insertNewUser,
	getPassQuery,
	getRangListFromDB,
} from "./queries.js";
import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import { resolve } from "path";

//server port
const PORT = process.env.PORT || 3001;
//Express setup
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//? middleware options ig
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", true);
	res.header(
		"Access-Control-Allow-Methods",
		"GET,PUT,POST,DELETE,UPDATE,OPTIONS"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
	);
	next();
});

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

  var sql = `INSERT INTO users (username, password, email, points) VALUES ("${username}", "${hash}", "${email}",0)`; //! SQL injection????

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

//jwt token sign function
function generateAccessToken(email) {
  let secretKey = "secret"; //! move secret keys to dotenv
  return jwt.sign(
    { email: email },
    secretKey,
    { algorithm: "HS256" },
    {
      expiresIn: "1h",
      issuer: "http://localhost:3001",
    }
  );
}

app.post("/login", async (req, res) => {
  //Store data in from the POST request
  const { email, password } = req.body;

  let data = {
    time: Date.now(),
    email: req.body.email,
  };

  //! Get id from the database based on the email
  //! put it in user object with the token

  //Store data from SELECT query
  const passwordInDB = await getPassQuery(email).catch((error) => {
    res.statusCode = 404;
    console.log(404);
    res.send(JSON.stringify({ error: "Invalid email", response: error }));
  });

  let token;

  //Check password againts the one fetched from the database
  if (res.statusCode != 404) {
    bcrypt.compare(password, passwordInDB).then((compareRes, compareErr) => {
      if (compareErr) throw compareErr;
      if (compareRes) {
        try {
          token = generateAccessToken(email);
        } catch (e) {
          throw new Error(e.message);
        }
        res.send({ Authorization: token });
        console.log("200 OK");
      } else {
        res.statusCode = 401;
        res.send(JSON.stringify({ error: "Invalid password" }));
        console.log("401 Auth Err");
      }
    });
  }
});

app.get("/userPage", (req, res) => {
  const header = req.headers["authorization"];

  //make sure if token header is not undefined
  if (header !== undefined) {
    const bearer = header.split(" "); //separate request token from bearer
    const token = bearer[1];
    req.token = token;
  } else {
    //if undefined return forbidden status code
    res.statusCode = 403;
  }
  jwt.verify(
    req.token,
    "secret",
    { algorithm: "HS256" },
    (err, authorizedData) => {
      if (err) {
        res.sendStatus(403);
        console.log("Caught you lacking");
      } else {
        res.sendStatus(200);
        console.log("Successful login");
      }
    }
  );
});

app.get("/friendPage", (req, res) => {
  const header = req.headers["authorization"];

  //make sure if token header is not undefined
  if (header !== undefined) {
    const bearer = header.split(" "); //separate request token from bearer
    const token = bearer[1];
    req.token = token;
  } else {
    //if undefined return forbidden status code
    res.sendStatus(403);
  }
  jwt.verify(req.token, "secret", { algorithm: "HS256" }, async (err) => {
    if (err) {
      await res.sendStatus(403);
      console.log("Caught you lacking");
    } else {
      res.sendStatus(200);
      console.log("Successful login");
    }
  });
});

app.get("/rankPage", (req, res) => {
  const header = req.headers["authorization"];

  //make sure if token header is not undefined
  if (header !== undefined) {
    const bearer = header.split(" "); //separate request token from bearer
    const token = bearer[1];
    req.token = token;
  } else {
    //if undefined return forbidden status code
    res.statusCode = 403;
  }
  jwt.verify(req.token, "secret", { algorithm: "HS256" }, async (err) => {
    if (err) {
      await res.sendStatus(403);
      console.log("Caught you lacking");
    } else {
      res.sendStatus(200);
      console.log("Successful login");
    }
  });
});

app.post("/logout", (req, res) => {
  //throw the cookie if user has logged out
  res.status(200).clearCookie("authorization", {
    path: "/login",
  });
  res.statusCode = 200;
  res.send("Logged out");
});

app.post("/settings", async (req, res) => {
  const { email, newUsername, newPassword, currentPassword } = req.body;
  const passwordInDB = await getPassQuery(email).catch((error) => {
    res.statusCode = 404;
    console.log(404);
    res.send(JSON.stringify({ error: "Invalid email", response: error }));
  });
  //Only runs if both values are changed
  if (newUsername != "" && newPassword !== "") {
    bcrypt
      .compare(currentPassword, passwordInDB)
      .then(async (compareRes, compareErr) => {
        if (compareErr) throw compareErr;
        if (compareRes) {
          let newEncryptedPassword = bcrypt.hashSync(newPassword, 10);
          try {
            await changeUsername(email, newUsername);
            await changePassword(email, newEncryptedPassword);
            res.statusCode = 200;
            res.send({ result: "Username and password updated" });
          } catch (error) {
            res.statusCode = 500;
            res.send({
              error: "UsernamePassword",
              errorUsername: "Error updating the username",
              errorPassword: "Error updating the password",
            });
          }
        } else {
          res.statusCode = 500;
          res.send({
            error: "Password",
            result: "Wrong password",
          });
        }
      });
  } //Change the password only
  else if (newPassword !== "") {
    bcrypt
      .compare(currentPassword, passwordInDB)
      .then(async (compareRes, compareErr) => {
        if (compareErr) throw compareErr;
        if (compareRes) {
          let newEncryptedPassword = bcrypt.hashSync(newPassword, 10);
          try {
            await changePassword(email, newEncryptedPassword);
            res.statusCode = 200;
            res.send({ result: "Password updated" });
          } catch (error) {
            res.statusCode = 500;
            res.send({
              error: "NewPassword",
              result: "Error updating the password",
            });
          }
        } else {
          res.statusCode = 500;
          res.send({
            error: "Password",
            result: "Wrong password",
          });
        }
      });
  } //Change username
  else if (newUsername !== "") {
    bcrypt
      .compare(currentPassword, passwordInDB)
      .then(async (compareRes, compareErr) => {
        if (compareErr) throw compareErr;
        if (compareRes) {
          try {
            await changeUsername(email, newUsername);
            res.statusCode = 200;
            res.send({ result: "Username updated" });
          } catch (error) {
            res.statusCode = 500;
            res.send({
              error: "Username",
              result: "Error updating the username",
            });
          }
        } else {
          res.statusCode = 500;
          res.send({
            error: "Password",
            result: "Wrong password",
          });
        }
      });
  }
});
